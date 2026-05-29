import type { Keypoint } from '@tensorflow-models/pose-detection';

import {
  computeAngleInDegrees,
  ema,
  keypointsToMap,
} from '../aiAssistant.tips.ts';
import type {
  FrameMetricsFront,
  FrameMetricsSide,
  FrontTrendState,
  SideTrendState,
} from './aiAssistant.tips.squat.types.ts';

type BodySide = 'left' | 'right';

const scoreOf = (keypoint?: Keypoint) => keypoint?.score ?? 0;

const buildQuality = (
  map: Map<string, Keypoint>,
  requiredNames: string[],
) => {
  const visibleKeypoints = requiredNames.filter((name) => map.has(name));
  const missingKeypoints = requiredNames.filter((name) => !map.has(name));
  const averageScore =
    visibleKeypoints.length === 0
      ? null
      : visibleKeypoints.reduce(
          (sum, name) => sum + scoreOf(map.get(name)),
          0,
        ) / visibleKeypoints.length;

  return { visibleKeypoints, missingKeypoints, averageScore };
};

const pickBestSide = (map: Map<string, Keypoint>): BodySide | null => {
  const leftScore =
    scoreOf(map.get('left_shoulder')) +
    scoreOf(map.get('left_hip')) +
    scoreOf(map.get('left_knee')) +
    scoreOf(map.get('left_ankle'));
  const rightScore =
    scoreOf(map.get('right_shoulder')) +
    scoreOf(map.get('right_hip')) +
    scoreOf(map.get('right_knee')) +
    scoreOf(map.get('right_ankle'));

  if (leftScore === 0 && rightScore === 0) return null;
  return leftScore >= rightScore ? 'left' : 'right';
};

const computeTorsoLeanFromVertical = (
  shoulder: Keypoint,
  hip: Keypoint,
): number => {
  const dx = shoulder.x - hip.x;
  const dy = hip.y - shoulder.y;
  return Math.abs(Math.atan2(dx, dy || 1) * (180 / Math.PI));
};

export function measureMetricsForSide(
  keypoints: Keypoint[],
  state: SideTrendState,
  options: { emaAlpha?: number } = {},
): {
  metrics: FrameMetricsSide;
  velocity: number | null;
  state: SideTrendState;
} {
  const { emaAlpha = 0.4 } = options;

  const map = keypointsToMap(keypoints);
  const side = pickBestSide(map);
  const requiredNames = side
    ? [`${side}_shoulder`, `${side}_hip`, `${side}_knee`, `${side}_ankle`]
    : ['left_hip', 'right_hip', 'left_knee', 'right_knee'];
  const quality = buildQuality(map, requiredNames);
  const shoulder = side ? map.get(`${side}_shoulder`) : undefined;
  const hip = side ? map.get(`${side}_hip`) : undefined;
  const knee = side ? map.get(`${side}_knee`) : undefined;
  const ankle = side ? map.get(`${side}_ankle`) : undefined;

  if (!hip || !knee || !ankle) {
    return {
      metrics: {
        view: 'side',
        kneeAngleDegrees: null,
        repMinKneeAngle: state.repMinKneeAngle,
        torsoLeanDegrees: null,
        ...quality,
      },
      velocity: null,
      state,
    };
  }

  const rawAngle = computeAngleInDegrees(hip, knee, ankle);
  const torsoLeanDegrees = shoulder
    ? computeTorsoLeanFromVertical(shoulder, hip)
    : null;
  const smoothedAngle = ema(state.emaAngle, rawAngle, emaAlpha);
  const velocity =
    state.prevAngle == null || smoothedAngle == null
      ? null
      : smoothedAngle - state.prevAngle;

  let repMinKneeAngle = state.repMinKneeAngle;
  if (smoothedAngle != null) {
    repMinKneeAngle =
      repMinKneeAngle == null
        ? smoothedAngle
        : Math.min(repMinKneeAngle, smoothedAngle);
  }

  const nextState: SideTrendState = {
    emaAngle: smoothedAngle,
    prevAngle: smoothedAngle ?? state.prevAngle,
    repMinKneeAngle,
  };

  return {
    metrics: {
      view: 'side',
      kneeAngleDegrees: smoothedAngle ?? null,
      repMinKneeAngle,
      torsoLeanDegrees,
      ...quality,
    },
    velocity,
    state: nextState,
  };
}

export function measureMetricsForFront(
  keypoints: Keypoint[],
  state: FrontTrendState,
  options: { emaAlpha?: number } = {},
): {
  metrics: FrameMetricsFront;
  velocity: number | null;
  state: FrontTrendState;
} {
  const { emaAlpha = 0.4 } = options;

  const map = keypointsToMap(keypoints);
  const lh = map.get('left_hip');
  const rh = map.get('right_hip');
  const lk = map.get('left_knee');
  const rk = map.get('right_knee');
  const ls = map.get('left_shoulder');
  const rs = map.get('right_shoulder');
  const la = map.get('left_ankle');
  const ra = map.get('right_ankle');
  const quality = buildQuality(map, [
    'left_shoulder',
    'right_shoulder',
    'left_hip',
    'right_hip',
    'left_knee',
    'right_knee',
    'left_ankle',
    'right_ankle',
  ]);

  if (!lh || !rh || !lk || !rk || !ls || !rs) {
    return {
      metrics: {
        view: 'front',
        depthRatio: null,
        repMaxDepthRatio: state.repMaxDepthRatio,
        shoulderWidth: null,
        kneeValgusRatio: null,
        depthAsymmetryRatio: null,
        ...quality,
      },
      velocity: null,
      state,
    };
  }

  const depth = Math.max(lk.y - lh.y, rk.y - rh.y);
  const shoulderWidth = Math.abs((rs?.x ?? 0) - (ls?.x ?? 0)) || 1;
  const leftDepth = lk.y - lh.y;
  const rightDepth = rk.y - rh.y;
  const ankleWidth = la && ra ? Math.abs(ra.x - la.x) : null;
  const kneeWidth = Math.abs(rk.x - lk.x);
  const kneeValgusRatio =
    ankleWidth != null && ankleWidth > 1 ? kneeWidth / ankleWidth : null;
  const depthAsymmetryRatio = Math.abs(leftDepth - rightDepth) / shoulderWidth;
  const rawRatio = depth / shoulderWidth;

  const smoothedRatio = ema(state.emaDepth, rawRatio, emaAlpha);
  const velocity =
    state.prevDepth == null || smoothedRatio == null
      ? null
      : smoothedRatio - state.prevDepth;

  let repMaxDepthRatio = state.repMaxDepthRatio;
  if (smoothedRatio != null) {
    repMaxDepthRatio =
      repMaxDepthRatio == null
        ? smoothedRatio
        : Math.max(repMaxDepthRatio, smoothedRatio);
  }

  const nextState: FrontTrendState = {
    emaDepth: smoothedRatio,
    prevDepth: smoothedRatio ?? state.prevDepth,
    repMaxDepthRatio,
  };

  return {
    metrics: {
      view: 'front',
      depthRatio: smoothedRatio ?? null,
      repMaxDepthRatio,
      shoulderWidth,
      kneeValgusRatio,
      depthAsymmetryRatio,
      ...quality,
    },
    velocity,
    state: nextState,
  };
}

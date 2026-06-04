import type { Keypoint } from '@tensorflow-models/pose-detection';

import {
  computeAngleInDegrees,
  ema,
  keypointsToMap,
} from '../aiAssistant.tips.ts';
import type {
  PushupFrameMetricsFront,
  PushupFrameMetricsSide,
  PushupTrendState,
} from './aiAssistant.tips.pushup.types.ts';

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
    scoreOf(map.get('left_elbow')) +
    scoreOf(map.get('left_wrist')) +
    scoreOf(map.get('left_hip')) +
    scoreOf(map.get('left_ankle'));
  const rightScore =
    scoreOf(map.get('right_shoulder')) +
    scoreOf(map.get('right_elbow')) +
    scoreOf(map.get('right_wrist')) +
    scoreOf(map.get('right_hip')) +
    scoreOf(map.get('right_ankle'));

  if (leftScore === 0 && rightScore === 0) return null;
  return leftScore >= rightScore ? 'left' : 'right';
};

const distance = (a: Keypoint, b: Keypoint) =>
  Math.hypot(a.x - b.x, a.y - b.y);

export function measurePushupMetricsForSide(
  keypoints: Keypoint[],
  state: PushupTrendState,
  options: { emaAlpha?: number } = {},
): {
  metrics: PushupFrameMetricsSide;
  velocity: number | null;
  state: PushupTrendState;
} {
  const { emaAlpha = 0.4 } = options;
  const map = keypointsToMap(keypoints);
  const side = pickBestSide(map);
  const requiredNames = side
    ? [
        `${side}_shoulder`,
        `${side}_elbow`,
        `${side}_wrist`,
        `${side}_hip`,
        `${side}_ankle`,
      ]
    : ['left_shoulder', 'right_shoulder', 'left_elbow', 'right_elbow'];
  const quality = buildQuality(map, requiredNames);

  const shoulder = side ? map.get(`${side}_shoulder`) : undefined;
  const elbow = side ? map.get(`${side}_elbow`) : undefined;
  const wrist = side ? map.get(`${side}_wrist`) : undefined;
  const hip = side ? map.get(`${side}_hip`) : undefined;
  const ankle = side ? map.get(`${side}_ankle`) : undefined;

  if (!shoulder || !elbow || !wrist) {
    return {
      metrics: {
        view: 'side',
        elbowAngleDegrees: null,
        repMinElbowAngle: state.repMinElbowAngle,
        bodyLineAngleDegrees: null,
        shoulderToWristDistanceRatio: null,
        ...quality,
      },
      velocity: null,
      state,
    };
  }

  const rawAngle = computeAngleInDegrees(shoulder, elbow, wrist);
  const smoothedAngle = ema(state.emaElbowAngle, rawAngle, emaAlpha);
  const velocity =
    state.prevElbowAngle == null || smoothedAngle == null
      ? null
      : smoothedAngle - state.prevElbowAngle;
  const repMinElbowAngle =
    smoothedAngle == null
      ? state.repMinElbowAngle
      : state.repMinElbowAngle == null
        ? smoothedAngle
        : Math.min(state.repMinElbowAngle, smoothedAngle);

  const bodyLineAngleDegrees =
    hip && ankle ? computeAngleInDegrees(shoulder, hip, ankle) : null;
  const shoulderToWristDistanceRatio =
    hip && ankle ? distance(shoulder, wrist) / (distance(shoulder, ankle) || 1) : null;

  return {
    metrics: {
      view: 'side',
      elbowAngleDegrees: smoothedAngle,
      repMinElbowAngle,
      bodyLineAngleDegrees,
      shoulderToWristDistanceRatio,
      ...quality,
    },
    velocity,
    state: {
      ...state,
      emaElbowAngle: smoothedAngle,
      prevElbowAngle: smoothedAngle ?? state.prevElbowAngle,
      repMinElbowAngle,
    },
  };
}

export function measurePushupMetricsForFront(
  keypoints: Keypoint[],
  state: PushupTrendState,
  options: { emaAlpha?: number } = {},
): {
  metrics: PushupFrameMetricsFront;
  velocity: number | null;
  state: PushupTrendState;
} {
  const { emaAlpha = 0.4 } = options;
  const map = keypointsToMap(keypoints);
  const requiredNames = [
    'left_shoulder',
    'right_shoulder',
    'left_elbow',
    'right_elbow',
    'left_wrist',
    'right_wrist',
  ];
  const quality = buildQuality(map, requiredNames);
  const ls = map.get('left_shoulder');
  const rs = map.get('right_shoulder');
  const le = map.get('left_elbow');
  const re = map.get('right_elbow');
  const lw = map.get('left_wrist');
  const rw = map.get('right_wrist');

  if (!ls || !rs || !le || !re || !lw || !rw) {
    return {
      metrics: {
        view: 'front',
        depthRatio: null,
        repMaxDepthRatio: state.repMaxDepthRatio,
        shoulderWidth: null,
        wristWidthRatio: null,
        elbowSymmetryRatio: null,
        shoulderTiltRatio: null,
        ...quality,
      },
      velocity: null,
      state,
    };
  }

  const shoulderWidth = Math.abs(rs.x - ls.x) || 1;
  const wristWidth = Math.abs(rw.x - lw.x);
  const wristWidthRatio = wristWidth / shoulderWidth;
  const leftElbowDepth = le.y - ls.y;
  const rightElbowDepth = re.y - rs.y;
  const depthRatio = Math.max(leftElbowDepth, rightElbowDepth) / shoulderWidth;
  const smoothedDepthRatio = ema(state.emaDepthRatio, depthRatio, emaAlpha);
  const velocity =
    state.prevDepthRatio == null || smoothedDepthRatio == null
      ? null
      : smoothedDepthRatio - state.prevDepthRatio;
  const repMaxDepthRatio =
    smoothedDepthRatio == null
      ? state.repMaxDepthRatio
      : state.repMaxDepthRatio == null
        ? smoothedDepthRatio
        : Math.max(state.repMaxDepthRatio, smoothedDepthRatio);

  return {
    metrics: {
      view: 'front',
      depthRatio: smoothedDepthRatio,
      repMaxDepthRatio,
      shoulderWidth,
      wristWidthRatio,
      elbowSymmetryRatio: Math.abs(leftElbowDepth - rightElbowDepth) / shoulderWidth,
      shoulderTiltRatio: Math.abs(ls.y - rs.y) / shoulderWidth,
      ...quality,
    },
    velocity,
    state: {
      ...state,
      emaDepthRatio: smoothedDepthRatio,
      prevDepthRatio: smoothedDepthRatio ?? state.prevDepthRatio,
      repMaxDepthRatio,
    },
  };
}

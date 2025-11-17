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
  const hip = map.get('left_hip') || map.get('right_hip');
  const knee = map.get('left_knee') || map.get('right_knee');
  const ankle = map.get('left_ankle') || map.get('right_ankle');

  if (!hip || !knee || !ankle) {
    return {
      metrics: {
        view: 'side',
        kneeAngleDegrees: null,
        repMinKneeAngle: state.repMinKneeAngle,
      },
      velocity: null,
      state,
    };
  }

  const rawAngle = computeAngleInDegrees(hip, knee, ankle);
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

  if (!lh || !rh || !lk || !rk || !ls || !rs) {
    return {
      metrics: {
        view: 'front',
        depthRatio: null,
        repMaxDepthRatio: state.repMaxDepthRatio,
        shoulderWidth: null,
      },
      velocity: null,
      state,
    };
  }

  const depth = Math.max(lk.y - lh.y, rk.y - rh.y);
  const shoulderWidth = Math.abs((rs?.x ?? 0) - (ls?.x ?? 0)) || 1;
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
    },
    velocity,
    state: nextState,
  };
}

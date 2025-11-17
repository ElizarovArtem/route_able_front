import type { Keypoint } from '@tensorflow-models/pose-detection';

import {
  ExerciseMode,
  parallelFrontProvider,
  parallelSideProvider,
  SquatRepTracker,
} from '@/e.entities/aiAssistant';

export function keypointsToMap(keypoints: Keypoint[]) {
  const nameToKeypoint = new Map<string, Keypoint>();
  for (const keypoint of keypoints) {
    if (keypoint.name) {
      nameToKeypoint.set(keypoint.name, keypoint);
    }
  }
  return nameToKeypoint;
}

export function computeAngleInDegrees(
  firstPoint: Keypoint,
  middlePoint: Keypoint,
  lastPoint: Keypoint,
): number {
  const vectorFromMiddleToFirst = {
    x: firstPoint.x - middlePoint.x,
    y: firstPoint.y - middlePoint.y,
  };
  const vectorFromMiddleToLast = {
    x: lastPoint.x - middlePoint.x,
    y: lastPoint.y - middlePoint.y,
  };

  const dotProduct =
    vectorFromMiddleToFirst.x * vectorFromMiddleToLast.x +
    vectorFromMiddleToFirst.y * vectorFromMiddleToLast.y;

  const lengthFirst = Math.hypot(
    vectorFromMiddleToFirst.x,
    vectorFromMiddleToFirst.y,
  );
  const lengthLast = Math.hypot(
    vectorFromMiddleToLast.x,
    vectorFromMiddleToLast.y,
  );

  const cosine = Math.min(
    1,
    Math.max(-1, dotProduct / (lengthFirst * lengthLast || 1)),
  );

  return Math.acos(cosine) * (180 / Math.PI);
}

export function ema(prev: number | null, next: number, alpha: number) {
  return prev == null ? next : prev * (1 - alpha) + next * alpha;
}

export const getTracker = (mode?: ExerciseMode) => {
  switch (mode) {
    case ExerciseMode.squatFront: {
      return new SquatRepTracker('front', [parallelFrontProvider]);
    }
    case ExerciseMode.squatSide: {
      return new SquatRepTracker('side', [parallelSideProvider]);
    }
    default: {
      return null;
    }
  }
};

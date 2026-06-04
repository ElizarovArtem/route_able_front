import type { Keypoint } from '@tensorflow-models/pose-detection';

import type { TrackerUpdateResult } from '@/e.entities/aiAssistant';
import {
  cameraQualityProvider,
  ExerciseKey,
  kneeValgusFrontProvider,
  parallelFrontProvider,
  parallelSideProvider,
  pushupBodyLineSideProvider,
  pushupCameraQualityProvider,
  pushupDepthProvider,
  pushupFrontDepthProvider,
  pushupHandPositionSideProvider,
  pushupHandWidthFrontProvider,
  PushupRepTracker,
  pushupSymmetryFrontProvider,
  pushupTempoProvider,
  SquatRepTracker,
  symmetryFrontProvider,
  tempoProvider,
  torsoLeanSideProvider,
} from '@/e.entities/aiAssistant';
import type { ViewAngle } from '@/e.entities/aiAssistant/model/aiAssistant.model.ts';

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

export type TrackerController = {
  update: (keypoints: Keypoint[]) => TrackerUpdateResult;
  reset: (nextView?: ViewAngle) => void;
};

export const getTracker = (view: ViewAngle, mode?: ExerciseKey) => {
  switch (mode) {
    case ExerciseKey.SQUAT: {
      const tracker =
        view === 'side'
          ? [
              cameraQualityProvider,
              parallelSideProvider,
              torsoLeanSideProvider,
              tempoProvider,
            ]
          : [
              cameraQualityProvider,
              parallelFrontProvider,
              kneeValgusFrontProvider,
              symmetryFrontProvider,
              tempoProvider,
            ];

      return new SquatRepTracker(view, tracker);
    }

    case ExerciseKey.PUSHUP: {
      const tracker =
        view === 'side'
          ? [
              pushupCameraQualityProvider,
              pushupDepthProvider,
              pushupBodyLineSideProvider,
              pushupHandPositionSideProvider,
              pushupTempoProvider,
            ]
          : [
              pushupCameraQualityProvider,
              pushupFrontDepthProvider,
              pushupHandWidthFrontProvider,
              pushupSymmetryFrontProvider,
              pushupTempoProvider,
            ];

      return new PushupRepTracker(view, tracker);
    }

    default: {
      return null;
    }
  }
};

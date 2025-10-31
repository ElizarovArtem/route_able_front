import type { Keypoint } from '@tensorflow-models/pose-detection';

import type { Tip } from './aiAssistant.model.ts';

export function computeAngleDegrees(
  pointA: Keypoint,
  vertexPoint: Keypoint,
  pointC: Keypoint,
) {
  const vectorAB = { x: pointA.x - vertexPoint.x, y: pointA.y - vertexPoint.y };
  const vectorCB = { x: pointC.x - vertexPoint.x, y: pointC.y - vertexPoint.y };

  const dotProduct = vectorAB.x * vectorCB.x + vectorAB.y * vectorCB.y;
  const lengthAB = Math.hypot(vectorAB.x, vectorAB.y);
  const lengthCB = Math.hypot(vectorCB.x, vectorCB.y);

  const cosine = Math.min(
    1,
    Math.max(-1, dotProduct / (lengthAB * lengthCB || 1)),
  );
  return Math.acos(cosine) * (180 / Math.PI);
}

export function keypointsToMap(keypoints: Keypoint[]) {
  const nameToKeypoint = new Map<string, Keypoint>();
  for (const keypoint of keypoints) {
    if (keypoint.name) nameToKeypoint.set(keypoint.name, keypoint);
  }
  return nameToKeypoint;
}

function getBodyProportions(keypoints: Keypoint[]) {
  const byName = keypointsToMap(keypoints);
  const hip = byName.get('left_hip') || byName.get('right_hip');
  const knee = byName.get('left_knee') || byName.get('right_knee');
  const ankle = byName.get('left_ankle') || byName.get('right_ankle');
  const shoulder = byName.get('left_shoulder') || byName.get('right_shoulder');
  const headRef = shoulder ? { x: shoulder.x, y: shoulder.y - 300 } : null;

  if (!hip || !knee || !ankle || !shoulder || !headRef) {
    return { femurToTibiaRatio: 1, torsoToFemurRatio: 1 };
  }

  const femurLength = Math.hypot(hip.x - knee.x, hip.y - knee.y);
  const tibiaLength = Math.hypot(knee.x - ankle.x, knee.y - ankle.y);
  const torsoLength = Math.hypot(shoulder.x - hip.x, shoulder.y - hip.y);

  return {
    femurToTibiaRatio: femurLength / (tibiaLength || 1),
    torsoToFemurRatio: torsoLength / (femurLength || 1),
  };
}

function getTargetsByProportions(
  femurToTibiaRatio: number,
  torsoToFemurRatio: number,
) {
  let kneeAngleTargetRange: [number, number] = [80, 95];
  let torsoAngleTargetRange: [number, number] = [55, 75];
  let shinTiltTargetRange: [number, number] = [15, 35];

  if (femurToTibiaRatio > 1.15) {
    kneeAngleTargetRange = [90, 105];
    torsoAngleTargetRange = [65, 85];
  } else if (femurToTibiaRatio < 0.9) {
    kneeAngleTargetRange = [75, 90];
    shinTiltTargetRange = [15, 45];
  }

  if (torsoToFemurRatio > 1.0) {
    torsoAngleTargetRange = [55, Math.max(torsoAngleTargetRange[1] - 5, 60)];
  }

  return { kneeAngleTargetRange, torsoAngleTargetRange, shinTiltTargetRange };
}

function isBackRoundingSuspected(keypoints: Keypoint[]) {
  console.log(keypoints);
  // заглушка — тут может быть более сложная логика (изменение кривизны/дифференциалы)
  return false;
}

export function getSquatTipsAdaptive(keypoints: Keypoint[]): Tip[] {
  const byName = keypointsToMap(keypoints);
  const hip = byName.get('left_hip') || byName.get('right_hip');
  const knee = byName.get('left_knee') || byName.get('right_knee');
  const ankle = byName.get('left_ankle') || byName.get('right_ankle');
  const shoulder = byName.get('left_shoulder') || byName.get('right_shoulder');
  if (!hip || !knee || !ankle || !shoulder) return [];

  const { femurToTibiaRatio, torsoToFemurRatio } =
    getBodyProportions(keypoints);
  const { kneeAngleTargetRange, torsoAngleTargetRange, shinTiltTargetRange } =
    getTargetsByProportions(femurToTibiaRatio, torsoToFemurRatio);

  const kneeAngleDegrees = computeAngleDegrees(hip, knee, ankle);
  const torsoAngleDegrees = computeAngleDegrees(
    hip,
    shoulder,
    { x: shoulder.x, y: shoulder.y - 100 }, // псевдо-вертикаль
  );
  const shinTiltDegrees = computeAngleDegrees(
    { x: knee.x, y: knee.y - 100 }, // псевдо-вертикаль у колена
    knee,
    ankle,
  );

  const tips: Tip[] = [];

  if (kneeAngleDegrees > kneeAngleTargetRange[1] + 5) {
    tips.push(
      femurToTibiaRatio > 1.15
        ? {
            severity: 'warn',
            text: 'С учётом длинного бедра глубины всё ещё не хватает — опустись ниже и контролируй корпус.',
          }
        : {
            severity: 'warn',
            text: 'Чуть глубже в нижней точке — можно сильнее согнуть колени.',
          },
    );
  }

  if (torsoAngleDegrees > torsoAngleTargetRange[1] + 5) {
    tips.push(
      femurToTibiaRatio > 1.15
        ? {
            severity: 'warn',
            text: 'Корпус наклонён слишком сильно. Сохраняй грудь вперёд-вверх, попробуй шире стойку или небольшую платформу под пятки.',
          }
        : {
            severity: 'warn',
            text: 'Держи корпус ровнее — активируй пресс и сохраняй нейтральную спину.',
          },
    );
  }

  if (shinTiltDegrees > shinTiltTargetRange[1] + 5) {
    tips.push({
      severity: 'info',
      text: 'Колени сильно уходят вперёд — перенеси вес к середине стопы и следи, чтобы пятки оставались на полу.',
    });
  }

  if (torsoAngleDegrees > 90 || isBackRoundingSuspected(keypoints)) {
    tips.push({
      severity: 'error',
      text: 'Спина округляется — держи нейтраль. Уменьши глубину или вес, собери корпус.',
    });
  }

  return tips;
}

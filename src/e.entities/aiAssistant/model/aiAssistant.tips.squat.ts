import type { Keypoint } from '@tensorflow-models/pose-detection';

import type { SquatView, Tip, TipContext } from './aiAssistant.model';
import { computeAngleInDegrees, keypointsToMap } from './aiAssistant.tips';

function getParallelTipsSide(
  keypoints: Keypoint[],
  targetKneeAngleDegrees = 100, // то, что считаем "параллелью"
  softMarginDegrees = 5,
): Tip[] {
  const keypointsByName = keypointsToMap(keypoints);
  const hipKeypoint =
    keypointsByName.get('left_hip') || keypointsByName.get('right_hip');
  const kneeKeypoint =
    keypointsByName.get('left_knee') || keypointsByName.get('right_knee');
  const ankleKeypoint =
    keypointsByName.get('left_ankle') || keypointsByName.get('right_ankle');

  if (!hipKeypoint || !kneeKeypoint || !ankleKeypoint) {
    return [];
  }

  const kneeAngleDegrees = computeAngleInDegrees(
    hipKeypoint,
    kneeKeypoint,
    ankleKeypoint,
  );

  // 1) стоим — молчим
  if (kneeAngleDegrees >= 150) {
    return [];
  }

  // 2) дошли до цели — хвалим
  if (kneeAngleDegrees <= targetKneeAngleDegrees) {
    return [
      {
        severity: 'success',
        text: 'Отлично, ты дошёл до параллели 👍',
      },
    ];
  }

  // 3) почти
  if (kneeAngleDegrees <= targetKneeAngleDegrees + softMarginDegrees) {
    return [
      {
        severity: 'info',
        text: 'Почти параллель — опустись ещё на пару сантиметров.',
      },
    ];
  }

  // 4) далеко
  return [
    {
      severity: 'warn',
      text: `Недостаточная глубина: угол в колене ≈ ${kneeAngleDegrees.toFixed(
        1,
      )}°. Постарайся опуститься ниже.`,
    },
  ];
}

// анфас: по вертикальному смещению таза к коленям
function getParallelTipsFront(
  keypoints: Keypoint[],
  depthRatioThreshold = 0.35,
  softMargin = 0.05,
): Tip[] {
  const keypointsByName = keypointsToMap(keypoints);

  const leftHip = keypointsByName.get('left_hip');
  const rightHip = keypointsByName.get('right_hip');
  const leftKnee = keypointsByName.get('left_knee');
  const rightKnee = keypointsByName.get('right_knee');
  const leftShoulder = keypointsByName.get('left_shoulder');
  const rightShoulder = keypointsByName.get('right_shoulder');

  if (
    !leftHip ||
    !rightHip ||
    !leftKnee ||
    !rightKnee ||
    !leftShoulder ||
    !rightShoulder
  ) {
    return [];
  }

  // глубина по Y
  const leftDepth = leftKnee.y - leftHip.y;
  const rightDepth = rightKnee.y - rightHip.y;
  const deepestDepth = Math.max(leftDepth, rightDepth);

  // масштаб — ширина плеч
  const shoulderWidth =
    Math.abs(rightShoulder.x - leftShoulder.x) > 0
      ? Math.abs(rightShoulder.x - leftShoulder.x)
      : 1;

  const depthRatio = deepestDepth / shoulderWidth;

  // 1) стоим — молчим
  const isStanding = depthRatio < 0.2;
  if (isStanding) {
    return [];
  }

  // 2) дошли — хвалим
  if (depthRatio >= depthRatioThreshold) {
    return [
      {
        severity: 'success',
        text: 'Отлично, глубина приседа есть ✅',
      },
    ];
  }

  // 3) почти
  if (depthRatio >= depthRatioThreshold - softMargin) {
    return [
      {
        severity: 'info',
        text: 'Почти нужная глубина, опустись чуть ниже.',
      },
    ];
  }

  // 4) далеко
  return [
    {
      severity: 'warn',
      text: 'Глубины пока нет — попробуй сильнее согнуть колени и опустить таз.',
    },
  ];
}

// обёртка над двумя вариантами
function getParallelTips(context: TipContext): Tip[] {
  if (context.view === 'side') {
    return getParallelTipsSide(context.keypoints);
  }
  return getParallelTipsFront(context.keypoints);
}

// ===== 2. пример доп. подсказки для ПРОФИЛЯ (наклон корпуса) =====

function getTorsoLeanTipsForSide(context: TipContext): Tip[] {
  if (context.view !== 'side') return [];

  const keypointsByName = keypointsToMap(context.keypoints);
  const hipKeypoint =
    keypointsByName.get('left_hip') || keypointsByName.get('right_hip');
  const shoulderKeypoint =
    keypointsByName.get('left_shoulder') ||
    keypointsByName.get('right_shoulder');

  if (!hipKeypoint || !shoulderKeypoint) return [];

  // угол между линией "таз -> плечо" и псевдо-вертикалью
  const torsoAngleDegrees = computeAngleInDegrees(
    hipKeypoint,
    shoulderKeypoint,
    { x: shoulderKeypoint.x, y: shoulderKeypoint.y - 100 },
  );

  // если угол большой — человек сильно наклонился
  if (torsoAngleDegrees > 80) {
    return [
      {
        severity: 'warn',
        text: 'Корпус сильно наклонён вперёд — подними грудь и напряги пресс.',
      },
    ];
  }

  return [];
}

// ===== 3. пример доп. подсказки для АНФАСА (колено внутрь, но очень грубо) =====

function getKneesInwardTipsForFront(context: TipContext): Tip[] {
  if (context.view !== 'front') return [];

  const keypointsByName = keypointsToMap(context.keypoints);

  const leftHip = keypointsByName.get('left_hip');
  const rightHip = keypointsByName.get('right_hip');
  const leftKnee = keypointsByName.get('left_knee');
  const rightKnee = keypointsByName.get('right_knee');

  if (!leftHip || !rightHip || !leftKnee || !rightKnee) {
    return [];
  }

  const tips: Tip[] = [];

  // левое колено ушло к центру
  if (leftKnee.x > leftHip.x + 12) {
    tips.push({
      severity: 'warn',
      text: 'Левое колено уходит внутрь — веди его по линии носка.',
    });
  }

  // правое колено ушло к центру
  if (rightKnee.x < rightHip.x - 12) {
    tips.push({
      severity: 'warn',
      text: 'Правое колено уходит внутрь — веди его по линии носка.',
    });
  }

  return tips;
}

// ===== 4. ГЛАВНАЯ ОБЁРТКА =====

/**
 * Сюда ты можешь добавлять новые функции-подсказчики.
 * Они все получают один и тот же контекст и возвращают массив подсказок.
 * Мы просто склеиваем их по очереди.
 */
const squatTipProviders: Array<(context: TipContext) => Tip[]> = [
  getParallelTips,
  // getTorsoLeanTipsForSide,
  // getKneesInwardTipsForFront,
  // сюда дальше дописываешь:
  // getFeetWidthTipsForFront,
  // getAsymmetryTips,
  // ...
];

/**
 * Главная функция: собрать все подсказки по очереди.
 */
export function collectSquatTips(
  keypoints: Keypoint[],
  view: SquatView,
): Tip[] {
  const context: TipContext = { keypoints, view };

  const allTips: Tip[] = [];

  for (const tipProvider of squatTipProviders) {
    const tipsFromProvider = tipProvider(context);
    if (tipsFromProvider && tipsFromProvider.length > 0) {
      allTips.push(...tipsFromProvider);
    }
  }

  return allTips;
}

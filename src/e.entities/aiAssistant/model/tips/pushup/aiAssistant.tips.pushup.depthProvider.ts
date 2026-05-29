import { RepPhase, type ProviderTip } from '../aiAssistant.tips.shared.types.ts';
import {
  PUSHUP_DEPTH_SOFT_ELBOW_DEG,
  PUSHUP_DEPTH_SOFT_FRONT_RATIO,
  PUSHUP_DEPTH_TARGET_ELBOW_DEG,
  PUSHUP_DEPTH_TARGET_FRONT_RATIO,
} from './aiAssistant.tips.pushup.constants.ts';
import type { PushupTipContext, PushupTipProvider } from './aiAssistant.tips.pushup.types.ts';

export const pushupDepthProvider: PushupTipProvider = (
  context: PushupTipContext,
): ProviderTip[] => {
  if (!(context.phase === RepPhase.Ascending && context.isFirstFrameInAscending)) {
    return [];
  }

  if (context.metrics.view !== 'side') return [];

  const minAngle = context.metrics.repMinElbowAngle;
  if (minAngle == null || minAngle <= PUSHUP_DEPTH_TARGET_ELBOW_DEG) return [];

  if (minAngle <= PUSHUP_DEPTH_TARGET_ELBOW_DEG + PUSHUP_DEPTH_SOFT_ELBOW_DEG) {
    return [
      {
        severity: 'info',
        text: 'Почти полная амплитуда — в следующем повторе опустись чуть ниже.',
      },
    ];
  }

  return [
    {
      severity: 'warn',
      text: 'Амплитуда отжимания короткая. Опускай грудь ниже, сохраняя корпус прямым.',
    },
  ];
};

export const pushupFrontDepthProvider: PushupTipProvider = (
  context: PushupTipContext,
): ProviderTip[] => {
  if (
    context.metrics.view !== 'front' ||
    !(context.phase === RepPhase.Ascending && context.isFirstFrameInAscending)
  ) {
    return [];
  }

  const depth = context.metrics.repMaxDepthRatio;
  if (depth == null) return [];

  if (depth < PUSHUP_DEPTH_TARGET_FRONT_RATIO - PUSHUP_DEPTH_SOFT_FRONT_RATIO) {
    return [
      {
        severity: 'warn',
        text: 'С фронтального вида амплитуда выглядит короткой. Для точной проверки глубины лучше поставить камеру сбоку.',
      },
    ];
  }

  return [];
};

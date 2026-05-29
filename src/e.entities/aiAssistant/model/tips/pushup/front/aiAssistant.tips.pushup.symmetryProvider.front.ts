import { RepPhase, type ProviderTip } from '../../aiAssistant.tips.shared.types.ts';
import {
  PUSHUP_ELBOW_ASYMMETRY_RATIO,
  PUSHUP_SHOULDER_TILT_RATIO,
} from '../aiAssistant.tips.pushup.constants.ts';
import type { PushupTipContext, PushupTipProvider } from '../aiAssistant.tips.pushup.types.ts';

export const pushupSymmetryFrontProvider: PushupTipProvider = (
  context: PushupTipContext,
): ProviderTip[] => {
  if (context.view !== 'front') return [];
  if (context.phase !== RepPhase.Bottom && context.phase !== RepPhase.Ascending) {
    return [];
  }
  if (context.metrics.view !== 'front') return [];

  if (
    context.metrics.elbowSymmetryRatio != null &&
    context.metrics.elbowSymmetryRatio > PUSHUP_ELBOW_ASYMMETRY_RATIO
  ) {
    return [
      {
        severity: 'warn',
        text: 'Локти двигаются несимметрично. Опускайся ровно, без перекоса на одну руку.',
      },
    ];
  }

  if (
    context.metrics.shoulderTiltRatio != null &&
    context.metrics.shoulderTiltRatio > PUSHUP_SHOULDER_TILT_RATIO
  ) {
    return [
      {
        severity: 'info',
        text: 'Плечи идут с перекосом. Держи корпус ровнее и распределяй вес на обе руки.',
      },
    ];
  }

  return [];
};

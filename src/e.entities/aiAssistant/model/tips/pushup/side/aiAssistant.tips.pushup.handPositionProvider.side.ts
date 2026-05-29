import { RepPhase, type ProviderTip } from '../../aiAssistant.tips.shared.types.ts';
import {
  PUSHUP_HAND_POSITION_MAX_RATIO,
  PUSHUP_HAND_POSITION_MIN_RATIO,
} from '../aiAssistant.tips.pushup.constants.ts';
import type { PushupTipContext, PushupTipProvider } from '../aiAssistant.tips.pushup.types.ts';

export const pushupHandPositionSideProvider: PushupTipProvider = (
  context: PushupTipContext,
): ProviderTip[] => {
  if (context.view !== 'side') return [];
  if (context.phase !== RepPhase.Descending && context.phase !== RepPhase.Bottom) {
    return [];
  }

  const ratio =
    context.metrics.view === 'side'
      ? context.metrics.shoulderToWristDistanceRatio
      : null;
  if (
    ratio == null ||
    (ratio >= PUSHUP_HAND_POSITION_MIN_RATIO && ratio <= PUSHUP_HAND_POSITION_MAX_RATIO)
  ) {
    return [];
  }

  return [
    {
      severity: 'info',
      text: 'Проверь постановку ладоней: кисти должны быть примерно под плечами, без сильного ухода вперед или назад.',
    },
  ];
};

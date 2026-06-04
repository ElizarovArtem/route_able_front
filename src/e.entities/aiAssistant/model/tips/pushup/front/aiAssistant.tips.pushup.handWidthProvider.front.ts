import { RepPhase, type ProviderTip } from '../../aiAssistant.tips.shared.types.ts';
import {
  PUSHUP_HAND_WIDTH_MAX_RATIO,
  PUSHUP_HAND_WIDTH_MIN_RATIO,
} from '../aiAssistant.tips.pushup.constants.ts';
import type { PushupTipContext, PushupTipProvider } from '../aiAssistant.tips.pushup.types.ts';

export const pushupHandWidthFrontProvider: PushupTipProvider = (
  context: PushupTipContext,
): ProviderTip[] => {
  if (context.view !== 'front') return [];
  if (context.phase !== RepPhase.Descending && context.phase !== RepPhase.Bottom) {
    return [];
  }

  const ratio =
    context.metrics.view === 'front' ? context.metrics.wristWidthRatio : null;
  if (
    ratio == null ||
    (ratio >= PUSHUP_HAND_WIDTH_MIN_RATIO && ratio <= PUSHUP_HAND_WIDTH_MAX_RATIO)
  ) {
    return [];
  }

  return [
    {
      severity: 'info',
      text: 'Проверь ширину постановки рук: ладони лучше держать примерно на ширине плеч или чуть шире.',
    },
  ];
};

import { RepPhase, type ProviderTip } from '../../aiAssistant.tips.shared.types.ts';
import { PUSHUP_BODY_LINE_MIN_DEG } from '../aiAssistant.tips.pushup.constants.ts';
import type { PushupTipContext, PushupTipProvider } from '../aiAssistant.tips.pushup.types.ts';

export const pushupBodyLineSideProvider: PushupTipProvider = (
  context: PushupTipContext,
): ProviderTip[] => {
  if (context.view !== 'side') return [];
  if (context.phase === RepPhase.Standing) return [];

  const bodyLine =
    context.metrics.view === 'side' ? context.metrics.bodyLineAngleDegrees : null;
  if (bodyLine == null || bodyLine >= PUSHUP_BODY_LINE_MIN_DEG) return [];

  return [
    {
      severity: 'warn',
      text: 'Корпус теряет прямую линию. Напряги пресс и ягодицы, держи таз на одной линии с плечами.',
    },
  ];
};

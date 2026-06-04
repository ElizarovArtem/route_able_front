import { RepPhase, type ProviderTip } from '../aiAssistant.tips.shared.types.ts';
import {
  PUSHUP_FAST_VELOCITY_ANGLE,
  PUSHUP_FAST_VELOCITY_DEPTH,
} from './aiAssistant.tips.pushup.constants.ts';
import type { PushupTipContext, PushupTipProvider } from './aiAssistant.tips.pushup.types.ts';

export const pushupTempoProvider: PushupTipProvider = (
  context: PushupTipContext,
): ProviderTip[] => {
  if (
    context.phase !== RepPhase.Descending &&
    context.phase !== RepPhase.Ascending
  ) {
    return [];
  }

  const velocity = context.velocity;
  if (velocity == null) return [];

  const isTooFast =
    context.view === 'side'
      ? Math.abs(velocity) > PUSHUP_FAST_VELOCITY_ANGLE
      : Math.abs(velocity) > PUSHUP_FAST_VELOCITY_DEPTH;

  if (!isTooFast) return [];

  return [
    {
      severity: 'info',
      text: 'Двигайся контролируемее: опускайся и поднимайся без рывков.',
    },
  ];
};

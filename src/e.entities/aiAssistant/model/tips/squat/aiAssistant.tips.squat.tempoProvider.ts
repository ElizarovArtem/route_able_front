import { RepPhase, type ProviderTip, type TipProvider } from '../aiAssistant.tips.shared.types.ts';
import {
  SQUAT_FAST_VELOCITY_ANGLE,
  SQUAT_FAST_VELOCITY_DEPTH,
} from './aiAssistant.tips.squat.constants.ts';
import type { TipContext } from './aiAssistant.tips.squat.types.ts';

export const tempoProvider: TipProvider<TipContext> = (context): ProviderTip[] => {
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
      ? Math.abs(velocity) > SQUAT_FAST_VELOCITY_ANGLE
      : Math.abs(velocity) > SQUAT_FAST_VELOCITY_DEPTH;

  if (!isTooFast) return [];

  return [
    {
      severity: 'info',
      text: 'Двигайся чуть контролируемее, без резких провалов и рывков.',
    },
  ];
};

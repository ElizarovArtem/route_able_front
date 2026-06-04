import { RepPhase, type ProviderTip, type TipProvider } from '../../aiAssistant.tips.shared.types.ts';
import { SQUAT_TORSO_LEAN_WARN_DEG } from '../aiAssistant.tips.squat.constants.ts';
import type { TipContext } from '../aiAssistant.tips.squat.types.ts';

export const torsoLeanSideProvider: TipProvider<TipContext> = (context): ProviderTip[] => {
  if (context.view !== 'side') return [];
  if (context.phase !== RepPhase.Descending && context.phase !== RepPhase.Bottom) {
    return [];
  }

  const torsoLean =
    context.metrics.view === 'side' ? context.metrics.torsoLeanDegrees : null;

  if (torsoLean == null || torsoLean <= SQUAT_TORSO_LEAN_WARN_DEG) return [];

  return [
    {
      severity: 'warn',
      text: 'Корпус сильно наклоняется вперед. Держи грудь выше и сохраняй нейтральную спину.',
    },
  ];
};

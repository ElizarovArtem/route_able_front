import { RepPhase, type ProviderTip, type TipProvider } from '../../aiAssistant.tips.shared.types.ts';
import { SQUAT_DEPTH_ASYMMETRY_WARN_RATIO } from '../aiAssistant.tips.squat.constants.ts';
import type { TipContext } from '../aiAssistant.tips.squat.types.ts';

export const symmetryFrontProvider: TipProvider<TipContext> = (context): ProviderTip[] => {
  if (context.view !== 'front') return [];
  if (context.phase !== RepPhase.Bottom && context.phase !== RepPhase.Ascending) {
    return [];
  }

  const asymmetry =
    context.metrics.view === 'front' ? context.metrics.depthAsymmetryRatio : null;

  if (asymmetry == null || asymmetry <= SQUAT_DEPTH_ASYMMETRY_WARN_RATIO) return [];

  return [
    {
      severity: 'info',
      text: 'Есть асимметрия по глубине. Старайся опускаться ровно на обе ноги.',
    },
  ];
};

import { RepPhase, type ProviderTip, type TipProvider } from '../../aiAssistant.tips.shared.types.ts';
import { SQUAT_KNEE_VALGUS_WARN_RATIO } from '../aiAssistant.tips.squat.constants.ts';
import type { TipContext } from '../aiAssistant.tips.squat.types.ts';

export const kneeValgusFrontProvider: TipProvider<TipContext> = (context): ProviderTip[] => {
  if (context.view !== 'front') return [];
  if (
    context.phase !== RepPhase.Descending &&
    context.phase !== RepPhase.Bottom
  ) {
    return [];
  }

  const ratio =
    context.metrics.view === 'front' ? context.metrics.kneeValgusRatio : null;

  if (ratio == null || ratio >= SQUAT_KNEE_VALGUS_WARN_RATIO) return [];

  return [
    {
      severity: 'warn',
      text: 'Колени заваливаются внутрь. Разводи колени по линии носков.',
    },
  ];
};

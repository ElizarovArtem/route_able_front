import { RepPhase, type ProviderTip, type TipProvider } from '../../aiAssistant.tips.shared.types.ts';
import {
  SQUAT_PARALLEL_SOFT_DEPTH,
  SQUAT_PARALLEL_TARGET_DEPTH,
} from '../aiAssistant.tips.squat.constants.ts';
import type { TipContext } from '../aiAssistant.tips.squat.types.ts';

export const parallelFrontProvider: TipProvider<TipContext> = (context): ProviderTip[] => {
  if (context.view !== 'front') return [];
  if (!(context.phase === RepPhase.Ascending && context.isFirstFrameInAscending)) {
    return [];
  }

  const repMax =
    context.metrics.view === 'front' ? context.metrics.repMaxDepthRatio : null;
  if (repMax == null || repMax >= SQUAT_PARALLEL_TARGET_DEPTH) return [];

  if (repMax >= SQUAT_PARALLEL_TARGET_DEPTH - SQUAT_PARALLEL_SOFT_DEPTH) {
    return [
      {
        severity: 'info',
        text: 'Почти нужная глубина — в следующем повторе опустись чуть ниже.',
      },
    ];
  }

  return [
    {
      severity: 'warn',
      text: 'До нужной глубины не дошёл — в следующем повторе садись ниже.',
    },
  ];
};

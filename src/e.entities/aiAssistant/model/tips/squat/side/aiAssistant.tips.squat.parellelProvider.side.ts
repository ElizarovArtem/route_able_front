import {
  type ProviderTip,
  RepPhase,
  type TipProvider,
} from '../../aiAssistant.tips.shared.types.ts';
import {
  SQUAT_PARALLEL_SOFT_DEG,
  SQUAT_PARALLEL_TARGET_DEG,
} from '../aiAssistant.tips.squat.constants.ts';
import type { TipContext } from '../aiAssistant.tips.squat.types.ts';

export const parallelSideProvider: TipProvider<TipContext> = (
  context,
): ProviderTip[] => {
  if (context.view !== 'side') return [];
  if (
    !(context.phase === RepPhase.Ascending && context.isFirstFrameInAscending)
  ) {
    return [];
  }

  const repMin =
    context.metrics.view === 'side' ? context.metrics.repMinKneeAngle : null;
  if (repMin == null || repMin <= SQUAT_PARALLEL_TARGET_DEG) return [];

  if (repMin <= SQUAT_PARALLEL_TARGET_DEG + SQUAT_PARALLEL_SOFT_DEG) {
    return [
      {
        severity: 'info',
        text: 'Почти параллель — в следующем повторе опустись чуть ниже.',
      },
    ];
  }

  return [
    {
      severity: 'warn',
      text: `До параллели не дошёл: минимальный угол ≈ ${repMin.toFixed(1)}°. В следующем повторе садись ниже.`,
    },
  ];
};

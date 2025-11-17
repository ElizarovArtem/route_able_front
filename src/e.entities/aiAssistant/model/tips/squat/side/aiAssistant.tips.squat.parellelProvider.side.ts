import {
  type ProviderTip,
  RepPhase,
  type TipContext,
} from '../aiAssistant.tips.squat.types.ts';

const TARGET = 100; // параллель
const SOFT = 5;

export function parallelSideProvider(context: TipContext): ProviderTip[] {
  if (context.view !== 'side') return [];
  if (
    !(context.phase === RepPhase.Ascending && context.isFirstFrameInAscending)
  )
    return [];

  const repMin =
    context.metrics.view === 'side' ? context.metrics.repMinKneeAngle : null;
  if (repMin == null) return [];

  // глубже или ровно цели — молчим (похвала сделает трекер по завершении)
  if (repMin <= TARGET) return [];

  if (repMin <= TARGET + SOFT) {
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
}

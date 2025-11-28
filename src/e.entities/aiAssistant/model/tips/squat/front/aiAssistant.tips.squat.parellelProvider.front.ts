import {
  type ProviderTip,
  RepPhase,
  type TipContext,
} from '../aiAssistant.tips.squat.types.ts';

const DEPTH = 0.35;
const SOFT = 0.05;

export function parallelFrontProvider(context: TipContext): ProviderTip[] {
  if (context.view !== 'front') return [];
  if (
    !(context.phase === RepPhase.Ascending && context.isFirstFrameInAscending)
  )
    return [];

  const repMax =
    context.metrics.view === 'front' ? context.metrics.repMaxDepthRatio : null;
  if (repMax == null) return [];

  if (repMax >= DEPTH) return [];

  if (repMax >= DEPTH - SOFT) {
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
}

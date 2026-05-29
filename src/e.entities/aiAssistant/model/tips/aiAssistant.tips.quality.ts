import { type ProviderTip, RepPhase } from './aiAssistant.tips.shared.types.ts';

const QUALITY_SCORE_THRESHOLD = 0.65;

type QualityContext = {
  phase: RepPhase;
  metrics: { missingKeypoints: string[]; averageScore: number | null };
};

export function makeCameraQualityProvider(messages: {
  missing: string;
  lowQuality: string;
}): (context: QualityContext) => ProviderTip[] {
  return (context) => {
    if (context.phase === RepPhase.Standing) return [];
    if (context.metrics.missingKeypoints.length > 0) {
      return [{ severity: 'info', text: messages.missing }];
    }
    if (
      context.metrics.averageScore != null &&
      context.metrics.averageScore < QUALITY_SCORE_THRESHOLD
    ) {
      return [{ severity: 'info', text: messages.lowQuality }];
    }
    return [];
  };
}

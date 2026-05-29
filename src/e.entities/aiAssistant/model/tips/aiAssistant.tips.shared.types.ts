import type { Keypoint } from '@tensorflow-models/pose-detection';

export type CameraView = 'side' | 'front';

export type TipSeverity = 'info' | 'warn' | 'error' | 'success';

export type Tip = { severity: TipSeverity; text: string; rep: number };

export type ProviderTip = Omit<Tip, 'rep'> & {
  cooldownMs?: number;
};

export enum RepPhase {
  Standing = 'Standing',
  Descending = 'Descending',
  Bottom = 'Bottom',
  Ascending = 'Ascending',
}

export type TrackerUpdateResult =
  | { phase: RepPhase; tips: Tip[]; event: 'none' | 'phase-change' }
  | { phase: RepPhase; tips: Tip[]; event: 'praise'; praise: string; rep: number };

export type BaseTipContext<TMetrics> = {
  keypoints: Keypoint[];
  view: CameraView;
  phase: RepPhase;
  prevPhase: RepPhase;
  isFirstFrameInAscending: boolean;
  velocity: number | null;
  metrics: TMetrics;
};

export type TipProvider<TContext> = (context: TContext) => ProviderTip[];

export type BaseThresholds = {
  velEpsAngle: number;
  velEpsDepth: number;
  tipsGlobalCooldownMs: number;
  praiseCooldownMs: number;
};

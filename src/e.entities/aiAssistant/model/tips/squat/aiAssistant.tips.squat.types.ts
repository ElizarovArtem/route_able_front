import type { Keypoint } from '@tensorflow-models/pose-detection';

export type CameraView = 'side' | 'front';

export type TipSeverity = 'info' | 'warn' | 'error' | 'success';

export type Tip = { severity: TipSeverity; text: string; rep: number };
export type ProviderTip = Omit<Tip, 'rep'>;

export type TipProvider = (context: TipContext) => ProviderTip[];

export type TipContext = {
  keypoints: Keypoint[];
  view: CameraView;
  phase: RepPhase;
  prevPhase: RepPhase;
  isFirstFrameInAscending: boolean;
  metrics: FrameMetrics;
};

export enum RepPhase {
  Standing = 'Standing',
  Descending = 'Descending',
  Bottom = 'Bottom',
  Ascending = 'Ascending',
}

export type TrackerUpdateResult =
  | {
      phase: RepPhase;
      tips: Tip[];
      event: 'none' | 'phase-change';
    }
  | {
      phase: RepPhase;
      tips: Tip[];
      event: 'praise';
      praise: string;
      rep: number;
    };

export type Thresholds = {
  // Standing (когда «стоим»)
  kneeAngleStandingDeg: number; // side: ≥ — стою (обычно 150–165)
  depthRatioStanding: number; // front: < — стою (обычно ~0.20)

  // Параллель (цели глубины)
  kneeAngleParallelDeg: number; // side: ≤ — параллель (по углу колена), напр. 100
  depthRatioParallel: number; // front: ≥ — параллель (по “глубине”), напр. 0.35

  // «Дно» (если где-то ещё используешь)
  kneeAngleBottomDeg: number; // side: ≤ — очень низко (напр. 90–95)
  depthRatioBottom: number; // front: ≥ — очень низко (напр. 0.40)

  // Чувствительность разворота тренда
  velEpsAngle: number; // deg/кадр для side (1.0–2.5 хорошее окно)
  velEpsDepth: number; // ratio/кадр для front (0.008–0.015)

  // Антиспам
  tipsGlobalCooldownMs: number;
  praiseCooldownMs: number;
};

export type FrameMetricsSide = {
  view: 'side';
  kneeAngleDegrees: number | null; // сглаженный текущий угол
  repMinKneeAngle: number | null; // минимум угла за текущий спуск (глубочайшая точка)
};

export type FrameMetricsFront = {
  view: 'front';
  depthRatio: number | null; // сглаженная глубина (норм. на плечи)
  repMaxDepthRatio: number | null; // максимум глубины за текущий спуск
  shoulderWidth: number | null;
};

export type FrameMetrics = FrameMetricsSide | FrameMetricsFront;

export type SideTrendState = {
  emaAngle: number | null;
  prevAngle: number | null;
  repMinKneeAngle: number | null;
};

export type FrontTrendState = {
  emaDepth: number | null;
  prevDepth: number | null;
  repMaxDepthRatio: number | null;
};

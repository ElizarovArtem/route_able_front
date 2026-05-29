import type {
  BaseThresholds,
  BaseTipContext,
  CameraView,
  ProviderTip,
  RepPhase,
  Tip,
  TipProvider,
  TipSeverity,
  TrackerUpdateResult,
} from '../aiAssistant.tips.shared.types.ts';

export type { CameraView, ProviderTip, RepPhase, Tip, TipProvider, TipSeverity, TrackerUpdateResult };

export type FrameMetricsSide = {
  view: 'side';
  kneeAngleDegrees: number | null;
  repMinKneeAngle: number | null;
  torsoLeanDegrees: number | null;
  visibleKeypoints: string[];
  missingKeypoints: string[];
  averageScore: number | null;
};

export type FrameMetricsFront = {
  view: 'front';
  depthRatio: number | null;
  repMaxDepthRatio: number | null;
  shoulderWidth: number | null;
  kneeValgusRatio: number | null;
  depthAsymmetryRatio: number | null;
  visibleKeypoints: string[];
  missingKeypoints: string[];
  averageScore: number | null;
};

export type FrameMetrics = FrameMetricsSide | FrameMetricsFront;

export type TipContext = BaseTipContext<FrameMetrics>;

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

export type Thresholds = BaseThresholds & {
  kneeAngleStandingDeg: number;
  depthRatioStanding: number;
  kneeAngleParallelDeg: number;
  depthRatioParallel: number;
  kneeAngleBottomDeg: number;
  depthRatioBottom: number;
};

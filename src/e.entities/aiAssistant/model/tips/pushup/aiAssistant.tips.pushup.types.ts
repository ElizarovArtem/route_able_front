import type {
  BaseThresholds,
  BaseTipContext,
  ProviderTip,
  RepPhase,
  Tip,
  TipProvider,
  TrackerUpdateResult,
} from '../aiAssistant.tips.shared.types.ts';

export type { ProviderTip, RepPhase, Tip, TrackerUpdateResult };

export type PushupFrameMetricsSide = {
  view: 'side';
  elbowAngleDegrees: number | null;
  repMinElbowAngle: number | null;
  bodyLineAngleDegrees: number | null;
  shoulderToWristDistanceRatio: number | null;
  visibleKeypoints: string[];
  missingKeypoints: string[];
  averageScore: number | null;
};

export type PushupFrameMetricsFront = {
  view: 'front';
  depthRatio: number | null;
  repMaxDepthRatio: number | null;
  shoulderWidth: number | null;
  wristWidthRatio: number | null;
  elbowSymmetryRatio: number | null;
  shoulderTiltRatio: number | null;
  visibleKeypoints: string[];
  missingKeypoints: string[];
  averageScore: number | null;
};

export type PushupFrameMetrics = PushupFrameMetricsSide | PushupFrameMetricsFront;

export type PushupTipContext = BaseTipContext<PushupFrameMetrics>;

export type PushupTipProvider = TipProvider<PushupTipContext>;

export type PushupTrendState = {
  emaElbowAngle: number | null;
  prevElbowAngle: number | null;
  repMinElbowAngle: number | null;
  emaDepthRatio: number | null;
  prevDepthRatio: number | null;
  repMaxDepthRatio: number | null;
};

export type PushupThresholds = BaseThresholds & {
  elbowAngleTopDeg: number;
  elbowAngleBottomDeg: number;
  frontDepthTopRatio: number;
  frontDepthBottomRatio: number;
};

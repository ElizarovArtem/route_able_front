import type {
  FrontTrendState,
  SideTrendState,
  Thresholds,
} from './aiAssistant.tips.squat.types';

// Параллель — используется и в DEFAULT_THRESHOLDS и в провайдерах глубины
export const SQUAT_PARALLEL_TARGET_DEG = 100;
export const SQUAT_PARALLEL_SOFT_DEG = 5;
export const SQUAT_PARALLEL_TARGET_DEPTH = 0.35;
export const SQUAT_PARALLEL_SOFT_DEPTH = 0.05;

// Темп
export const SQUAT_FAST_VELOCITY_ANGLE = 8;
export const SQUAT_FAST_VELOCITY_DEPTH = 0.055;

// Колени
export const SQUAT_KNEE_VALGUS_WARN_RATIO = 0.72;

// Асимметрия глубины
export const SQUAT_DEPTH_ASYMMETRY_WARN_RATIO = 0.1;

// Наклон корпуса
export const SQUAT_TORSO_LEAN_WARN_DEG = 38;

// Порог качества распознавания (используется в обоих упражнениях)
export const POSE_QUALITY_SCORE_THRESHOLD = 0.65;

export const DEFAULT_THRESHOLDS: Thresholds = {
  kneeAngleStandingDeg: 150,
  depthRatioStanding: 0.2,

  kneeAngleParallelDeg: SQUAT_PARALLEL_TARGET_DEG,
  depthRatioParallel: SQUAT_PARALLEL_TARGET_DEPTH,

  kneeAngleBottomDeg: 95,
  depthRatioBottom: 0.4,

  velEpsAngle: 1.5,
  velEpsDepth: 0.01,

  tipsGlobalCooldownMs: 2000,
  praiseCooldownMs: 1500,
};

export const initialSideTrendState: SideTrendState = {
  emaAngle: null,
  prevAngle: null,
  repMinKneeAngle: null,
};

export const initialFrontTrendState: FrontTrendState = {
  emaDepth: null,
  prevDepth: null,
  repMaxDepthRatio: null,
};

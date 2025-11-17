import type {
  FrontTrendState,
  SideTrendState,
  Thresholds,
} from './aiAssistant.tips.squat.types';

export const DEFAULT_THRESHOLDS: Thresholds = {
  // стою
  kneeAngleStandingDeg: 150,
  depthRatioStanding: 0.2,

  // параллель
  kneeAngleParallelDeg: 100,
  depthRatioParallel: 0.35,

  // дно (если используешь где-то ещё; update по тренду уже не требует их)
  kneeAngleBottomDeg: 95,
  depthRatioBottom: 0.4,

  // разворот тренда
  velEpsAngle: 1.5,
  velEpsDepth: 0.01,

  // антиспам
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

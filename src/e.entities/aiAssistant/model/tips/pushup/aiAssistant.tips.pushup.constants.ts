import type { PushupThresholds } from './aiAssistant.tips.pushup.types.ts';

// Глубина — используется и в PUSHUP_THRESHOLDS и в провайдерах глубины
export const PUSHUP_DEPTH_TARGET_ELBOW_DEG = 105;
export const PUSHUP_DEPTH_SOFT_ELBOW_DEG = 12;
export const PUSHUP_DEPTH_TARGET_FRONT_RATIO = 0.3;
export const PUSHUP_DEPTH_SOFT_FRONT_RATIO = 0.05;

// Темп
export const PUSHUP_FAST_VELOCITY_ANGLE = 9;
export const PUSHUP_FAST_VELOCITY_DEPTH = 0.06;

// Прямая тела
export const PUSHUP_BODY_LINE_MIN_DEG = 160;

// Постановка рук (вид сбоку)
export const PUSHUP_HAND_POSITION_MIN_RATIO = 0.18;
export const PUSHUP_HAND_POSITION_MAX_RATIO = 0.42;

// Ширина рук (вид спереди)
export const PUSHUP_HAND_WIDTH_MIN_RATIO = 0.9;
export const PUSHUP_HAND_WIDTH_MAX_RATIO = 1.8;

// Симметрия (вид спереди)
export const PUSHUP_ELBOW_ASYMMETRY_RATIO = 0.12;
export const PUSHUP_SHOULDER_TILT_RATIO = 0.08;

export const PUSHUP_THRESHOLDS: PushupThresholds = {
  elbowAngleTopDeg: 150,
  elbowAngleBottomDeg: PUSHUP_DEPTH_TARGET_ELBOW_DEG,
  frontDepthTopRatio: 0.16,
  frontDepthBottomRatio: PUSHUP_DEPTH_TARGET_FRONT_RATIO,
  velEpsAngle: 1.5,
  velEpsDepth: 0.01,
  tipsGlobalCooldownMs: 2200,
  praiseCooldownMs: 1500,
};

import type { Keypoint } from '@tensorflow-models/pose-detection';

export type PoseDetectionOptions = {
  targetFps?: number; // 10–20 достаточно
  scoreThreshold?: number; // 0.4–0.6
  modelType?: 'lightning' | 'thunder'; // MoveNet
};

export type SpeakOptions = {
  cooldownMs?: number; // антиспам для одинаковых фраз
  language?: string; // 'ru-RU', 'en-US', ...
  voiceName?: string; // точное имя голоса, если хочешь
  rate?: number; // 0.1..10 (1 = обычная скорость)
  pitch?: number; // 0..2 (1 = обычная высота)
  volume?: number; // 0..1
  interrupt?: boolean; // прерывать текущую речь
  groupKey?: string; // отдельный кулдаун по группе (например, 'depth')
  dedupe?: boolean; // не читать подряд одинаковый текст (по умолчанию true)
};

export enum ExerciseMode {
  squat = 'squat',
}

export type SquatView = 'side' | 'front';

export type TipSeverity = 'info' | 'warn' | 'error' | 'success';

export type Tip = {
  severity: TipSeverity;
  text: string;
};

export type TipContext = {
  keypoints: Keypoint[];
  view: SquatView;
};

export type ParallelCheckResult = {
  reached: boolean; // дошёл до параллели
  confidence: number; // 0..1 насколько мы уверены
  reason?: string; // почему нет
};

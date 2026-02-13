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
  squatFront = 'squatFront',
  squatSide = 'squatSide',
}

export enum ExerciseKey {
  BARBELL_BENCH_PRESS = 'barbell_bench_press',
  DUMBBELL_BENCH_PRESS = 'dumbbell_bench_press',
  INCLINE_BENCH_PRESS = 'incline_bench_press',

  PUSHUP = 'pushup',
  DIP = 'dip',

  PULL_UP = 'pull_up',
  LAT_PULLDOWN = 'lat_pulldown',

  BENT_OVER_ROW = 'bent_over_row',
  DUMBBELL_ROW = 'dumbbell_row',

  DEADLIFT = 'deadlift',
  SQUAT = 'squat',
  GOBLET_SQUAT = 'goblet_squat',
  LEG_PRESS = 'leg_press',
  LUNGE = 'lunge',

  DUMBBELL_SHOULDER_PRESS = 'dumbbell_shoulder_press',
  DUMBBELL_LATERAL_RAISE = 'dumbbell_lateral_raise',
}

export enum ViewAngle {
  'front' = 'front',
  'side' = 'side',
}

export const EXERCISE_VIEWS: Partial<Record<ExerciseKey, ViewAngle[]>> = {
  [ExerciseKey.SQUAT]: [ViewAngle.side, ViewAngle.front],
};

export const exerciseLabels: Record<ExerciseKey, string> = {
  [ExerciseKey.BARBELL_BENCH_PRESS]: 'Жим штанги лёжа',
  [ExerciseKey.DUMBBELL_BENCH_PRESS]: 'Жим гантелей лёжа',
  [ExerciseKey.INCLINE_BENCH_PRESS]: 'Жим на наклонной скамье',

  [ExerciseKey.PUSHUP]: 'Отжимания',
  [ExerciseKey.DIP]: 'Отжимания на брусьях',

  [ExerciseKey.PULL_UP]: 'Подтягивания',
  [ExerciseKey.LAT_PULLDOWN]: 'Тяга верхнего блока',

  [ExerciseKey.BENT_OVER_ROW]: 'Тяга штанги в наклоне',
  [ExerciseKey.DUMBBELL_ROW]: 'Тяга гантели в наклоне',

  [ExerciseKey.DEADLIFT]: 'Становая тяга',
  [ExerciseKey.SQUAT]: 'Приседания',
  [ExerciseKey.GOBLET_SQUAT]: 'Гоблет-присед',
  [ExerciseKey.LEG_PRESS]: 'Жим ногами',
  [ExerciseKey.LUNGE]: 'Выпады',

  [ExerciseKey.DUMBBELL_SHOULDER_PRESS]: 'Жим гантелей над головой',
  [ExerciseKey.DUMBBELL_LATERAL_RAISE]: 'Разведения гантелей в стороны',
};

export enum AiWorkoutStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export enum AiWorkoutExerciseStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export type AiWorkoutExercise = {
  id: string;
  sessionId: string;
  order: number;
  name: string;
  targetMuscle: string | null;
  setsPlanned: number;
  repsPerSet: number;
  restSeconds: number | null;
  setsCompleted: number;
  status: AiWorkoutExerciseStatus;
  exerciseKey: ExerciseKey | null;
  notes: string | null;
};

export type AiWorkoutSession = {
  id: string;
  userId: string;
  date: string;
  status: AiWorkoutStatus;
  userIntent: string | null;
  energyLevel: number | null;
  sleepQuality: number | null;
  nutritionQuality: number | null;
  weightGoalSnapshot: string | null;
  modelRaw: unknown;
  sourceSessionId: string | null;
  exercises: AiWorkoutExercise[];
  currentExerciseIndex: number;
  createdAt: string;
  updatedAt: string;
};

export type AiSessionTemplate = {
  templateId: string;
  lastSessionId: string;
  lastDate: string;
  lastStatus: AiWorkoutStatus;
  timesPerformed: number;
  userIntent: string | null;
  exercises: AiWorkoutExercise[];
};

export type AiWorkoutHistoryItem = {
  id: string;
  date: string;
  status: AiWorkoutStatus;
  templateId: string;
  sourceSessionId: string | null;
  userIntent: string | null;
  createdAt: Date;
};

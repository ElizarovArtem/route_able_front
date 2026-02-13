import { AiWorkoutStatus } from '@/e.entities/aiAssistant';

export const WORKOUT_MAP = {
  [AiWorkoutStatus.PLANNED]: 'Запланировано',
  [AiWorkoutStatus.IN_PROGRESS]: 'В процессе',
  [AiWorkoutStatus.COMPLETED]: 'Завершено',
  [AiWorkoutStatus.CANCELED]: 'Отменено',
};

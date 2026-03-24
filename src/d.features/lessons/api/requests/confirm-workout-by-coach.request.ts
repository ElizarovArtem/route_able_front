import { api } from '@/f.shared/api';

export type ConfirmWorkoutByCoachRequest = {
  lessonId: string;
};

export const confirmWorkoutByCoach = async ({
  lessonId,
}: ConfirmWorkoutByCoachRequest): Promise<void> => {
  await api.post(`/coach-workout-sessions/${lessonId}/complete`);
};

import { api } from '@/f.shared/api';

export type ConfirmWorkoutByClientRequest = {
  lessonId: string;
};

export const confirmWorkoutByClient = async ({
  lessonId,
}: ConfirmWorkoutByClientRequest): Promise<void> => {
  await api.post(`/coach-workout-sessions/${lessonId}/confirm`);
};

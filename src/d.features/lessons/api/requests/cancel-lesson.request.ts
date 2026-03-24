import { api } from '@/f.shared/api';

export type CancelLessonRequest = {
  sessionId: string;
};

export const cancelSlotBooking = async ({ sessionId }: CancelLessonRequest) => {
  const { data } = await api.post<boolean>(
    `/coach-workout-sessions/${sessionId}/cancel`,
  );

  return data;
};

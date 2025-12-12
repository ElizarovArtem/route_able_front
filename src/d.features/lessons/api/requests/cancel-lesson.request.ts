import { api } from '@/f.shared/api';

export type CancelLessonRequest = {
  relationId: string;
  lessonId: string;
};

export const cancelSlotBooking = async ({ lessonId }: CancelLessonRequest) => {
  const { data } = await api.delete<boolean>(
    `/client-coach/:relationId/video-lessons/${lessonId}`,
  );

  return data;
};

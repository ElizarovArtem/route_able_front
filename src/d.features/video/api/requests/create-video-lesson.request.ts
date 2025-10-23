import { api } from '@/f.shared/api';

export type CreateVideoLessonRequest = {
  relationId: string;
  startAt: string;
  endAt: string;
  title?: string;
  notes?: string;
};

export const createVideoLesson = async ({
  relationId,
  ...payload
}: CreateVideoLessonRequest) => {
  const { data } = await api.post(`/client-coach/${relationId}/video-lessons`, {
    ...payload,
  });

  return data;
};

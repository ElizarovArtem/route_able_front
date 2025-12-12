import { api } from '@/f.shared/api';

export type CreateVideoLessonRequest = {
  slotId: string;
};

export const createVideoLesson = async ({
  slotId,
  ...payload
}: CreateVideoLessonRequest) => {
  const { data } = await api.post(`/slots/${slotId}/book`, {
    ...payload,
  });

  return data;
};

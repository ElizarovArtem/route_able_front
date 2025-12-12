import type { VideoLessonDto } from '@/e.entities/lessons/api/requests/get-video-lessons.request.ts';
import { api } from '@/f.shared/api';

export type BookSlotRequest = {
  slotId: string;
  title?: string;
  notes?: string;
};

export const bookSlot = async ({ slotId, ...payload }: BookSlotRequest) => {
  const { data } = await api.post<VideoLessonDto>(
    `/slots/${slotId}/book`,
    payload,
  );

  return data;
};

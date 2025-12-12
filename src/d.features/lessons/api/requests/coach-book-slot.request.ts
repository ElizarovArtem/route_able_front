import type { VideoLessonDto } from '@/e.entities/lessons/api/requests/get-video-lessons.request.ts';
import { api } from '@/f.shared/api';

export type CoachBookSlotRequest = {
  slotId: string;
  clientId: string;
  title?: string;
  notes?: string;
};

export const coachBookSlot = async ({
  slotId,
  ...payload
}: CoachBookSlotRequest) => {
  const { data } = await api.post<VideoLessonDto>(
    `/coach/slots/${slotId}/book`,
    payload,
  );

  return data;
};

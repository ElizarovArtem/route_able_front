import type { CoachWorkoutSession } from '@/e.entities/lessons/model/lessons.types.ts';
import { api } from '@/f.shared/api';

export type BookSlotRequest = {
  slotId: string;
  title?: string;
  notes?: string;
};

export const bookSlot = async ({ slotId, ...payload }: BookSlotRequest) => {
  const { data } = await api.post<CoachWorkoutSession>(
    `/slots/${slotId}/book`,
    payload,
  );

  return data;
};

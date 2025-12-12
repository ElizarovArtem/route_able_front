import type { TimeSlotDto } from '@/e.entities/lessons/model/lessons.model.ts';
import { api } from '@/f.shared/api';

export type GetCoachSlotsParams = {
  coachId: string;
  date: string;
};

export const getCoachSlots = async ({ coachId, date }: GetCoachSlotsParams) => {
  const { data } = await api.get<TimeSlotDto[]>(`/coaches/${coachId}/slots`, {
    params: { date },
  });

  return data;
};

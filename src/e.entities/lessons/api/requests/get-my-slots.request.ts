import type { TimeSlotDto } from '@/e.entities/lessons/model/lessons.model.ts';
import { api } from '@/f.shared/api';

export type GetMySlotsParams = {
  date: string;
};

export const getMySlots = async ({ date }: GetMySlotsParams) => {
  const { data } = await api.get<TimeSlotDto[]>('/coach/slots', {
    params: { date },
  });

  return data;
};

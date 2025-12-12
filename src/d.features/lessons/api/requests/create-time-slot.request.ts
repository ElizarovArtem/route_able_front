import type { TimeSlotDto } from '@/e.entities/lessons/model/lessons.model.ts';
import { api } from '@/f.shared/api';

export type CreateTimeSlotRequest = {
  startAt: string;
  endAt: string;
  clientId?: string;
  note?: string;
};

export const createTimeSlot = async (
  payload: CreateTimeSlotRequest,
): Promise<TimeSlotDto> => {
  const { data } = await api.post<TimeSlotDto>('/coach/slots', payload);

  return data;
};

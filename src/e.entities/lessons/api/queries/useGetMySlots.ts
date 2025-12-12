import { useQuery } from '@tanstack/react-query';

import {
  getMySlots,
  type GetMySlotsParams,
} from '@/e.entities/lessons/api/requests/get-my-slots.request.ts';
import type { TimeSlotDto } from '@/e.entities/lessons/model/lessons.model.ts';

export const useGetMySlots = (date?: GetMySlotsParams['date']) => {
  return useQuery<TimeSlotDto[]>({
    queryKey: ['coach-slots', date],
    queryFn: () => getMySlots({ date: date as string }),
    enabled: Boolean(date),
    staleTime: 0,
  });
};

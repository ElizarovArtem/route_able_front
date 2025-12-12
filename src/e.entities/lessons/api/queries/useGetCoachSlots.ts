import { useQuery } from '@tanstack/react-query';

import {
  getCoachSlots,
  type GetCoachSlotsParams,
} from '@/e.entities/lessons/api/requests/get-coach-slots.request.ts';
import type { TimeSlotDto } from '@/e.entities/lessons/model/lessons.model.ts';

export const useGetCoachSlots = (
  coachId?: GetCoachSlotsParams['coachId'],
  date?: GetCoachSlotsParams['date'],
) => {
  return useQuery<TimeSlotDto[]>({
    queryKey: ['coach-slots', coachId, date],
    queryFn: () =>
      getCoachSlots({ coachId: coachId as string, date: date as string }),
    enabled: Boolean(coachId && date),
  });
};

import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  coachBookSlot,
  type CoachBookSlotRequest,
} from '@/d.features/lessons/api/requests/coach-book-slot.request.ts';
import type { CoachWorkoutSession } from '@/e.entities/lessons/model/lessons.types.ts';

export const useCoachBookSlot = (
  mutationOptions?: MutationOptions<
    CoachWorkoutSession,
    AxiosError,
    CoachBookSlotRequest
  >,
) => {
  return useMutation<CoachWorkoutSession, AxiosError, CoachBookSlotRequest>({
    mutationFn: coachBookSlot,
    ...mutationOptions,
  });
};

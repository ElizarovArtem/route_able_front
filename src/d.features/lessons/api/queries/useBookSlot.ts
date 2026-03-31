import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  bookSlot,
  type BookSlotRequest,
} from '@/d.features/lessons/api/requests/book-slot.request.ts';
import type { CoachWorkoutSession } from '@/e.entities/lessons/model/lessons.types.ts';

export const useBookSlot = (
  mutationOptions?: MutationOptions<
    CoachWorkoutSession,
    AxiosError,
    BookSlotRequest
  >,
) => {
  return useMutation<CoachWorkoutSession, AxiosError, BookSlotRequest>({
    mutationFn: bookSlot,
    ...mutationOptions,
  });
};

import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  createTimeSlot,
  type CreateTimeSlotRequest,
} from '@/d.features/lessons/api/requests/create-time-slot.request.ts';
import type { TimeSlotDto } from '@/e.entities/lessons/model/lessons.model.ts';

export const useCreateTimeSlot = (
  mutationOptions?: MutationOptions<
    TimeSlotDto,
    AxiosError,
    CreateTimeSlotRequest
  >,
) => {
  return useMutation<TimeSlotDto, AxiosError, CreateTimeSlotRequest>({
    mutationFn: createTimeSlot,
    ...mutationOptions,
  });
};

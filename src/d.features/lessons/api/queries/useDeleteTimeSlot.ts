import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  deleteTimeSlot,
  type DeleteTimeSlotRequest,
} from '@/d.features/lessons/api/requests/delete-time-slot.request.ts';

export const useDeleteTimeSlot = (
  mutationOptions?: MutationOptions<void, AxiosError, DeleteTimeSlotRequest>,
) => {
  return useMutation<void, AxiosError, DeleteTimeSlotRequest>({
    mutationFn: deleteTimeSlot,
    ...mutationOptions,
  });
};

import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  confirmWorkoutByClient,
  type ConfirmWorkoutByClientRequest,
} from '@/d.features/lessons/api/requests/confirm-workout-by-client.request.ts';

export const useConfirmWorkoutByClient = (
  mutationOptions?: MutationOptions<
    void,
    AxiosError,
    ConfirmWorkoutByClientRequest
  >,
) => {
  return useMutation<void, AxiosError, ConfirmWorkoutByClientRequest>({
    mutationFn: confirmWorkoutByClient,
    ...mutationOptions,
  });
};

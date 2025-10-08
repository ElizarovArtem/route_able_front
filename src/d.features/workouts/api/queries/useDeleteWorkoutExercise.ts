import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  deleteWorkoutExerciseApi,
  type TDeleteWorkoutExerciseRequest,
} from '../requests/delete-workout-exercise.request';

export const useDeleteWorkoutExercise = (
  mutationOptions?: MutationOptions<
    void,
    AxiosError,
    TDeleteWorkoutExerciseRequest
  >,
) => {
  return useMutation<void, AxiosError, TDeleteWorkoutExerciseRequest>({
    mutationFn: deleteWorkoutExerciseApi,
    ...mutationOptions,
  });
};

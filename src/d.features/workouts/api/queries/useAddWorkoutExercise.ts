import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  addWorkoutExerciseApi,
  type TAddWorkoutExerciseRequest,
} from '../requests/add-workout-exercise.request';

export const useAddWorkoutExercise = (
  mutationOptions?: MutationOptions<
    void,
    AxiosError,
    TAddWorkoutExerciseRequest
  >,
) => {
  return useMutation<void, AxiosError, TAddWorkoutExerciseRequest>({
    mutationFn: addWorkoutExerciseApi,
    ...mutationOptions,
  });
};

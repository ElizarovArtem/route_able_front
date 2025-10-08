import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  completeWorkoutExerciseApi,
  type TCompleteWorkoutExerciseRequest,
} from '../requests/complete-workout-exercise.request';

export const useCompleteWorkoutExercise = (
  mutationOptions?: MutationOptions<
    void,
    AxiosError,
    TCompleteWorkoutExerciseRequest
  >,
) => {
  return useMutation<void, AxiosError, TCompleteWorkoutExerciseRequest>({
    mutationFn: completeWorkoutExerciseApi,
    ...mutationOptions,
  });
};

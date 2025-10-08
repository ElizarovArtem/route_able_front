import { useQuery } from '@tanstack/react-query';

import {
  getWorkoutExercisesApi,
  type TGetWorkoutExercisesRequest,
  type TGetWorkoutExercisesResponse,
} from '../requests/get-workout-exercises.request';

export const useGetWorkoutExercises = ({
  date,
  relationId,
}: TGetWorkoutExercisesRequest) => {
  return useQuery<TGetWorkoutExercisesResponse>({
    queryKey: ['workouts', relationId, date],
    queryFn: () =>
      getWorkoutExercisesApi({
        date,
        relationId,
      }),
    staleTime: 1000 * 60 * 5, // кэш на 5 минут
    enabled: Boolean(date && relationId),
  });
};

import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { getMyAiWorkoutsHistory } from '@/e.entities/aiAssistant/api/requests/get-my-workouts-history.request.ts';
import type { AiWorkoutHistoryItem } from '@/e.entities/aiAssistant/model/aiAssistant.model.ts';

export const useGetMyAiWorkoutsHistory = () => {
  return useQuery<AiWorkoutHistoryItem[], AxiosError>({
    queryKey: ['myAiWorkoutsHistory'],
    queryFn: () => getMyAiWorkoutsHistory(),
    staleTime: 0,
  });
};

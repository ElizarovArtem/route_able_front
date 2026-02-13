import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { getMyAiWorkouts } from '@/e.entities/aiAssistant/api/requests/get-my-workouts.request.ts';
import type { AiSessionTemplate } from '@/e.entities/aiAssistant/model/aiAssistant.model.ts';

export const useGetMyAiWorkouts = () => {
  return useQuery<AiSessionTemplate[], AxiosError>({
    queryKey: ['myAiWorkouts'],
    queryFn: () => getMyAiWorkouts(),
    staleTime: 0,
  });
};

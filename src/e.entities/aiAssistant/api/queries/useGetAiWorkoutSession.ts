import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { AiWorkoutSession } from '@/e.entities/aiAssistant';

import { getAiWorkoutSession } from '../requests/get-workout-session.request.ts';

export const useGetAiWorkoutSession = (templateId: string | null) => {
  return useQuery<AiWorkoutSession, AxiosError>({
    queryKey: ['aiWorkoutSession', templateId],
    queryFn: () => getAiWorkoutSession(templateId as string),
    enabled: Boolean(templateId),
    staleTime: 0,
  });
};

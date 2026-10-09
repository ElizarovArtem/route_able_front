import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { AiWorkoutSession } from '@/e.entities/aiAssistant';

import { getAiWorkoutSession } from '../requests/get-workout-session.request.ts';

export const useContinueAiWorkoutSession = (sessionId: string | null) => {
  return useQuery<AiWorkoutSession, AxiosError>({
    queryKey: ['aiWorkoutContinue', sessionId],
    queryFn: () => {
      if (!sessionId) throw new Error('sessionId is required');
      return getAiWorkoutSession(sessionId);
    },
    enabled: false,
    staleTime: 0,
  });
};

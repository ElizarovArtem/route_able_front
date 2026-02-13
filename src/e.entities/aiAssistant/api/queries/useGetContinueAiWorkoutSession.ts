import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { AiWorkoutSession } from '@/e.entities/aiAssistant';

import { getAiWorkoutContinueSession } from '../requests/get-continue-workout-session.request.ts';

export const useContinueAiWorkoutSession = (sessionId: string | null) => {
  return useQuery<AiWorkoutSession, AxiosError>({
    queryKey: ['aiWorkoutContinue', sessionId],
    queryFn: () => {
      console.log(sessionId);
      if (!sessionId) throw new Error('sessionId is required');
      return getAiWorkoutContinueSession(sessionId);
    },
    enabled: false,
    staleTime: 0,
  });
};

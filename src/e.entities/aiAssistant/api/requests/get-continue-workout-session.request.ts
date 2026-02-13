import { api } from '@/f.shared/api';

import type { AiWorkoutSession } from '../../model/aiAssistant.model.ts';

export const getAiWorkoutContinueSession = async (templateId: string) => {
  const { data } = await api.get<AiWorkoutSession>(
    `/ai/workouts/templates/${templateId}/last`,
  );

  return data;
};

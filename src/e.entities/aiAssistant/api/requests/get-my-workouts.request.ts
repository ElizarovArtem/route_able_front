import type { AiSessionTemplate } from '@/e.entities/aiAssistant/model/aiAssistant.model.ts';
import { api } from '@/f.shared/api';

export const getMyAiWorkouts = async () => {
  const { data } = await api.get<AiSessionTemplate[]>(`/ai/workouts`);

  return data;
};

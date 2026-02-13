import type { AiWorkoutHistoryItem } from '@/e.entities/aiAssistant/model/aiAssistant.model.ts';
import { api } from '@/f.shared/api';

export const getMyAiWorkoutsHistory = async () => {
  const { data } =
    await api.get<AiWorkoutHistoryItem[]>(`/ai/workouts/history`);

  return data;
};

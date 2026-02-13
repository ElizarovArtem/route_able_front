import type { AxiosResponse } from 'axios';

import { api } from '@/f.shared/api';

export type DeleteAiWorkoutTemplateRequest = {
  templateId: string;
};

export const deleteAiWorkoutTemplate = async ({
  templateId,
}: DeleteAiWorkoutTemplateRequest) => {
  const { data } = await api.delete<null, AxiosResponse<null>>(
    `/ai/workouts/templates/${templateId}`,
  );

  return data;
};

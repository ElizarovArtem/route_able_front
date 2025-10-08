import { api } from '@/f.shared/api';

export type CompletePlannedMealRequest = {
  relationId: string;
  plannedMealId: string;
};

export const completePlannedMealApi = async ({
  relationId,
  plannedMealId,
}: CompletePlannedMealRequest) => {
  const response = await api.post(
    `/client-coach/${relationId}/planned-meals/${plannedMealId}/consume`,
  );

  return response.data;
};

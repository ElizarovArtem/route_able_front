import { api } from '@/f.shared/api';

export type DeletePlannedMealRequest = {
  relationId: string;
  plannedMealId: string;
};

export const deletePlannedMealApi = async ({
  relationId,
  plannedMealId,
}: DeletePlannedMealRequest) => {
  const response = await api.delete(
    `/client-coach/${relationId}/planned-meals/${plannedMealId}`,
  );

  return response.data;
};

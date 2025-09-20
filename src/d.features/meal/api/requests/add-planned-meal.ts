import { api } from '@/f.shared/api';

export type AddPlannedMealRequest = {
  relationId: string;
  date: string;
  text: string;
};

export const addPlannedMealApi = async ({
  relationId,
  ...data
}: AddPlannedMealRequest) => {
  const response = await api.post(
    `/client-coach/${relationId}/planned-meals`,
    data,
  );

  return response.data;
};

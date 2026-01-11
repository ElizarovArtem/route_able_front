import type { AxiosResponse } from 'axios';

import type { UpdateUserFatGoalsFormData } from '@/d.features/user';
import { api } from '@/f.shared/api';

export const updateUserFatGoalsApi = async (
  data: UpdateUserFatGoalsFormData,
): Promise<null> => {
  const response = await api.patch<
    UpdateUserFatGoalsFormData,
    AxiosResponse<null>
  >('/user/goals', data);

  return response.data;
};

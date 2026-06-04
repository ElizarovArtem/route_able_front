import type { AxiosResponse } from 'axios';

import type { UserMakeTDEEAnalyzeFormData } from '@/e.entities/user/model/resolvers/user.make-tdee-analyze-resolver.ts';
import { api } from '@/f.shared/api';

export type MakeUserTDEEAnalyzeRequest = Omit<
  UserMakeTDEEAnalyzeFormData,
  'birthDate'
> & { birthDate: string };

export const makeUserTDEEAnalyzeApi = async (
  data: MakeUserTDEEAnalyzeRequest,
): Promise<null> => {
  const response = await api.patch<
    MakeUserTDEEAnalyzeRequest,
    AxiosResponse<null>
  >('/user/tdee', data);

  return response.data;
};

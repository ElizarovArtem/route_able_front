import type { AxiosResponse } from 'axios';

import type { CoachVerificationRequest } from '@/e.entities/user/model/user.types.ts';
import { api } from '@/f.shared/api';

export const getCoachVerificationRequests = async (): Promise<
  CoachVerificationRequest[]
> => {
  const response = await api.get<
    null,
    AxiosResponse<CoachVerificationRequest[]>
  >('/admin/coach-verification-requests');

  return response.data;
};

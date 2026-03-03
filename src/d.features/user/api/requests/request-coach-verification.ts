import type { AxiosResponse } from 'axios';

import { api } from '@/f.shared/api';

export type RequestCoachVerificationRequest = {
  name?: string;
  contactInfo: string;
};

export const requestCoachVerification = async (
  data: RequestCoachVerificationRequest,
): Promise<null> => {
  const response = await api.post<
    RequestCoachVerificationRequest,
    AxiosResponse<null>
  >('/coach-verification', data);

  return response.data;
};

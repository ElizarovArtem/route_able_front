import type { AxiosResponse } from 'axios';

import { ReviewDecision } from '@/e.entities/user/model/user.enums.ts';
import { api } from '@/f.shared/api';

export type ReviewCoachVerificationRequest = {
  verificationId: string;
  decision: ReviewDecision;
};

export const reviewCoachVerification = async ({
  verificationId,
  decision,
}: ReviewCoachVerificationRequest): Promise<null> => {
  const response = await api.post<
    ReviewCoachVerificationRequest,
    AxiosResponse<null>
  >(`admin/coach-verification-requests/${verificationId}/review`, { decision });

  return response.data;
};

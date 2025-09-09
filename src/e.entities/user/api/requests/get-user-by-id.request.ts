import type { AxiosResponse } from 'axios';

import { type User } from '@/e.entities/user';
import { api } from '@/f.shared/api';

export type GetRelationResponse = {
  meRole: 'CLIENT' | 'COACH' | 'NONE'; // кем я являюсь в паре (или пока не в паре)
  partner: User;
  relation: {
    id: string;
    isActive: boolean;
    activatedAt?: Date | null;
    deactivatedAt?: Date | null;
  } | null;
  chat: {
    id: string;
  } | null;
  // заделы, могут быть null до внедрения:
  billing: { isActive: boolean; creditsRemaining?: number | null } | null;
  booking: {
    next?: {
      id: string;
      startsAt: string;
      endsAt: string;
      status: string;
    } | null;
  } | null;
};

export const getRelation = async (
  partnerId: string,
): Promise<GetRelationResponse> => {
  const response = await api.get<null, AxiosResponse<GetRelationResponse>>(
    `/relations/with/${partnerId}`,
  );

  return response.data;
};

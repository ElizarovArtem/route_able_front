import type { AxiosResponse } from 'axios';

import { Roles, type User } from '@/e.entities/user';
import type { Relation } from '@/e.entities/user/model/user.model.ts';
import { api } from '@/f.shared/api';

export type GetRelationResponse = {
  meRole: Roles; // кем я являюсь в паре (или пока не в паре)
  partner: User;
  relation: Relation | null;
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
    `/client-coach/with/${partnerId}`,
  );

  return response.data;
};

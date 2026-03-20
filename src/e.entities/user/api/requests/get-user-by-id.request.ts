import type { AxiosResponse } from 'axios';

import type { NutritionBlock } from '@/e.entities/meal/model/meal.model.ts';
import { Roles } from '@/e.entities/user';
import type { Relation } from '@/e.entities/user/model/user.types.ts';
import { api } from '@/f.shared/api';

export type GetRelationResponse = {
  meRole: Roles;
  partner: {
    id: string;
    name: string;
    avatar?: string | null;
    about: string;
    weight: number;
    height: number;
    rating: {
      avg: number;
      count: number;
    } | null;
  };
  relation: Relation | null;
  chat: {
    id: string;
  } | null;
  nutrition: NutritionBlock | null;
};

export const getRelation = async (
  partnerId: string,
  date?: string,
): Promise<GetRelationResponse> => {
  const response = await api.get<null, AxiosResponse<GetRelationResponse>>(
    `/client-coach/with/${partnerId}`,
    { params: { date } },
  );

  return response.data;
};

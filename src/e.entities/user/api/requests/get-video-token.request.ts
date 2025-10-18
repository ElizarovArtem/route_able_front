import { api } from '@/f.shared/api';

export type GetVideoTokenResponse = {
  token: string;
  url: string;
};

export const getVideoToken = async (relationId: string) => {
  const { data } = await api.get<GetVideoTokenResponse>('/video/token', {
    params: { relationId },
  });

  return data;
};

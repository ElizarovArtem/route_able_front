import type { AxiosResponse } from 'axios';

import { api } from '@/f.shared/api';

export const analyzeBodyFatByPhotoApi = async (
  data: FormData,
): Promise<number> => {
  const response = await api.post<FormData, AxiosResponse<number>>(
    '/user/body-fat/photo',
    data,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );

  return response.data;
};

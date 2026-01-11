import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { analyzeBodyFatByPhotoApi } from '../requests/analyze-body-fat-by-photo.api.ts';

export const useAnalyzeBodyFatByPhoto = (
  mutationOptions?: MutationOptions<number, AxiosError, FormData>,
) => {
  return useMutation<number, AxiosError, FormData>({
    mutationFn: analyzeBodyFatByPhotoApi,
    ...mutationOptions,
  });
};

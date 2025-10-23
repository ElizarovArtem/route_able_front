import {
  type MutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  createVideoLesson,
  type CreateVideoLessonRequest,
} from '../requests/create-video-lesson.request.ts';

export const useCreateVideoLesson = (
  options: MutationOptions<
    unknown,
    AxiosError,
    CreateVideoLessonRequest,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restOptions } = options;

  return useMutation({
    mutationFn: createVideoLesson,
    ...restOptions,
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({
        queryKey: ['videoLessons', variables.relationId],
      });
      onSuccess?.(data, variables, context, mutation);
    },
  });
};

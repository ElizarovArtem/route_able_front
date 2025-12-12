import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  type CancelLessonRequest,
  cancelSlotBooking,
} from '@/d.features/lessons/api/requests/cancel-lesson.request.ts';

export const useCancelLesson = (
  mutationOptions?: MutationOptions<boolean, AxiosError, CancelLessonRequest>,
) => {
  return useMutation<boolean, AxiosError, CancelLessonRequest>({
    mutationFn: cancelSlotBooking,
    ...mutationOptions,
  });
};

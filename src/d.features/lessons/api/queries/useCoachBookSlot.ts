import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  coachBookSlot,
  type CoachBookSlotRequest,
} from '@/d.features/lessons/api/requests/coach-book-slot.request.ts';
import type { VideoLessonDto } from '@/e.entities/lessons/api/requests/get-video-lessons.request.ts';

export const useCoachBookSlot = (
  mutationOptions?: MutationOptions<
    VideoLessonDto,
    AxiosError,
    CoachBookSlotRequest
  >,
) => {
  return useMutation<VideoLessonDto, AxiosError, CoachBookSlotRequest>({
    mutationFn: coachBookSlot,
    ...mutationOptions,
  });
};

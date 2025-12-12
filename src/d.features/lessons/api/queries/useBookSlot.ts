import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  bookSlot,
  type BookSlotRequest,
} from '@/d.features/lessons/api/requests/book-slot.request.ts';
import type { VideoLessonDto } from '@/e.entities/lessons/api/requests/get-video-lessons.request.ts';

export const useBookSlot = (
  mutationOptions?: MutationOptions<
    VideoLessonDto,
    AxiosError,
    BookSlotRequest
  >,
) => {
  return useMutation<VideoLessonDto, AxiosError, BookSlotRequest>({
    mutationFn: bookSlot,
    ...mutationOptions,
  });
};

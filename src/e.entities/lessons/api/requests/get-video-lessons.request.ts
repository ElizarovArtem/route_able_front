import { LessonStatus } from '@/e.entities/lessons/model/lessons.model.ts';
import type { User } from '@/e.entities/user';
import { api } from '@/f.shared/api';

export type VideoLessonDto = {
  id: string;
  clientCoachId: string;
  clientId: string;
  coachId: string;
  startAt: string;
  endAt: string;
  status: LessonStatus;
  client: User;
  title?: string | null;
  notes?: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export const getVideoLessons = async (relationId: string) => {
  const { data } = await api.get<VideoLessonDto[]>(
    `/client-coach/${relationId}/video-lessons`,
  );
  return data;
};

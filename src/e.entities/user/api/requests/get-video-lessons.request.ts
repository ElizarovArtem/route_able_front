import { api } from '@/f.shared/api';

export enum LessonStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export type VideoLessonDto = {
  id: string;
  clientCoachId: string;
  clientId: string;
  coachId: string;
  startAt: string;
  endAt: string;
  status: LessonStatus;
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

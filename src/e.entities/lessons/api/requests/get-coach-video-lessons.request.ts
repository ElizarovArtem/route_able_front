import type { User } from '@/e.entities/user';
import type { Relation } from '@/e.entities/user/model/user.model.ts';
import { api } from '@/f.shared/api';

export type GetCoachVideoLessonsParams = {
  date: string;
};

export enum LessonStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export type GetCoachVideoLesson = {
  id: string;
  clientCoachId: string;
  clientId: string;
  coachId: string;
  startAt: string;
  endAt: string;
  status: LessonStatus;
  title: string;
  notes: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  client: User;
  relation: Relation;
};

export const getCoachVideoLessons = async ({
  date,
}: GetCoachVideoLessonsParams) => {
  const { data } = await api.get<GetCoachVideoLesson[]>(
    '/coach/video-lessons',
    {
      params: { date },
    },
  );

  return data;
};

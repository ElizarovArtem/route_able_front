import type { VideoLessonDto } from '@/e.entities/lessons/api/requests/get-video-lessons.request.ts';
import type { ClientCoachRelationDto } from '@/e.entities/user/model/user.model.ts';

export enum TimeSlotStatus {
  FREE = 'FREE',
  BOOKED = 'BOOKED',
  DISABLED = 'DISABLED',
}

export type TimeSlotDto = {
  id: string;
  coachId: string;
  clientCoachId?: string | null;
  startAt: string;
  endAt: string;
  status: TimeSlotStatus;
  videoLessonId?: string | null;
  createdAt: string;
  note?: string | null;
  relation?: ClientCoachRelationDto | null;
  videoLesson?: VideoLessonDto | null;
};

export enum LessonStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

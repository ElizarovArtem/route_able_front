import {
  CoachWorkoutSessionStatus,
  type LessonStatus,
  TimeSlotStatus,
} from '@/e.entities/lessons/model/lessons.constants.ts';
import type { Relation, User } from '@/e.entities/user/model/user.types.ts';

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
  bookedSession: {
    client: User;
    clientId: string;
    id: string;
    orderId: string;
    scheduledAt: string;
    status: TimeSlotStatus;
  };
};

export type CoachWorkoutSession = {
  id: string;
  clientId: string;
  coachId: string;
  clientCoachId: string;
  orderId: string;
  timeSlotId: string;
  scheduledAt: string;
  durationMinutes: string;
  status: CoachWorkoutSessionStatus;
  price: number;
  currency: string;
  coachMarkedCompletedAt: string;
  clientConfirmedAt: string;
  autoConfirmedAt: string;
  cancelledAt: string;
  disputedAt: string;
  cancelReason: string;
  disputeReason: string;
  createdAt: string;
  updatedAt: string;
};
export type PlannedLesson = {
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

import { CoachWorkoutSessionStatus } from '@/e.entities/lessons/model/lessons.constants.ts';
import type { User } from '@/e.entities/user/model/user.types.ts';

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
  bookedSession: {
    client: User;
    clientId: string;
    id: string;
    orderId: string;
    scheduledAt: string;
    status: TimeSlotStatus;
  };
};

export enum LessonStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

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

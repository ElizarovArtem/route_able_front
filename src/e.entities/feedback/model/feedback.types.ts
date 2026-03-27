import { FeedbackType } from '@/e.entities/feedback/model/feedback.constants.ts';

export type Feedback = {
  id: string;
  userId: string;
  type: FeedbackType;
  message: string;
  name: string;
  contact: string;
};

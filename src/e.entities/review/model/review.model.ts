import type { User } from '@/e.entities/user';

export type Review = {
  id: string;
  coachId: string;
  authorId: string;
  author: User;
  rating: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

export type ReviewForm = {
  rating: string;
  review: string;
};

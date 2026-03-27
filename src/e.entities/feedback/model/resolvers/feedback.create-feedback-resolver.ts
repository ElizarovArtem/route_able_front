import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FeedbackType } from '@/e.entities/feedback/model/feedback.constants.ts';

export const createFeedbackSchema = z.object({
  type: z.nativeEnum(FeedbackType),

  message: z
    .string()
    .min(5, 'Message must be at least 5 characters')
    .max(3000, 'Message must be at most 3000 characters'),

  name: z.string().max(255, 'Name must be at most 255 characters'),

  contact: z.string().max(255, 'Contact must be at most 255 characters'),
});
export type TCreateFeedbackFormData = z.infer<typeof createFeedbackSchema>;

export const createFeedbackFormResolver = zodResolver(createFeedbackSchema);

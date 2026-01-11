import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const updateUserFatGoalsSchema = z.object({
  calories: z.coerce.number().optional(),
  protein: z.coerce.number().optional(),
  fat: z.coerce.number().optional(),
  carbs: z.coerce.number().optional(),
});

export type UpdateUserFatGoalsFormData = z.infer<
  typeof updateUserFatGoalsSchema
>;

export const updateUserFatGoalsFormResolver = zodResolver(
  updateUserFatGoalsSchema,
);

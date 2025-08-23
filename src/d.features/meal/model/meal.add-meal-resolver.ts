import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const createMealSchema = z.object({
  name: z.string({ required_error: 'Название обязательно' }),
  calories: z.coerce.number().optional(),
  protein: z.coerce.number().optional(),
  fat: z.coerce.number().optional(),
  carbs: z.coerce.number().optional(),
});

export type TCreateMealFormData = z.infer<typeof createMealSchema>;

export const mealFormResolver = zodResolver(createMealSchema);

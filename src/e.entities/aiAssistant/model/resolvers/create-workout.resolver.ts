import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const createAiWorkoutSchema = z.object({
  intent: z
    .string({ required_error: 'Заполните поле' })
    .min(1, 'Заполните поле'),
  energyLevel: z.coerce.number({ required_error: 'Заполните поле' }),
  sleepQuality: z.coerce.number({ required_error: 'Заполните поле' }),
  nutritionQuality: z.coerce.number({ required_error: 'Заполните поле' }),
});

export type CreateAiWorkoutFormData = z.infer<typeof createAiWorkoutSchema>;

export const createAiWorkoutResolver = zodResolver(createAiWorkoutSchema);

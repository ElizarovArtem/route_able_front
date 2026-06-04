import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const createCoachOfferSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Введите название')
    .max(255, 'Максимум 255 символов'),

  description: z.string().trim().optional().or(z.literal('')),

  sessionCount: z.coerce
    .number()
    .int('Должно быть целое число')
    .min(1, 'Минимум 1 занятие'),

  price: z.coerce.number().min(0, 'Цена не может быть отрицательной'),

  currency: z.string().length(3).optional(),
});

export type CreateCoachOfferFormValues = z.infer<typeof createCoachOfferSchema>;

export const createCoachOfferFormResolver = zodResolver(createCoachOfferSchema);

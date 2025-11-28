import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const authSchema = z
  .object({
    email: z.string().email().optional(),
    phone: z
      .string()
      .regex(/^\+?\d{10,15}$/, 'Некорректный номер телефона')
      .optional(),
  })
  .refine((data) => data.email || data.phone, {
    message: 'Заполните email или телефон',
  });

export type TAuthFormData = z.infer<typeof authSchema>;

export const authFormResolver = zodResolver(authSchema);

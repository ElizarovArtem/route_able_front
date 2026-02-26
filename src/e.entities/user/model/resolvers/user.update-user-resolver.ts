import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  ActivityLevel,
  WeightGoal,
} from '@/e.entities/user/model/user.enums.ts';

export const avatarFileSchema = z.object({
  name: z.string(),
  type: z.enum(['image/jpeg', 'image/png', 'image/webp']),
  size: z.number().max(5 * 1024 * 1024, 'Файл слишком большой (макс. 5MB)'),
});

const createUpdateUserSchema = z.object({
  name: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  about: z.string().optional(),
  avatar: z.any().optional(),
  activityLevel: z
    .enum(Object.values(ActivityLevel) as [string, ...string[]], {
      required_error: 'Укажите уровень активности',
    })
    .optional(),

  weightGoal: z
    .enum(Object.values(WeightGoal) as [string, ...string[]], {
      required_error: 'Укажите цель',
    })
    .optional(),
});

export type TUpdateUserFormData = z.infer<typeof createUpdateUserSchema>;

export const updateUserFormResolver = zodResolver(createUpdateUserSchema);

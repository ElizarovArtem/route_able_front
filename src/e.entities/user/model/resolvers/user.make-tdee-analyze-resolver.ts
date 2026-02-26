import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  ActivityLevel,
  Gender,
  WeightGoal,
} from '@/e.entities/user/model/user.enums.ts';

const userMakeTDEEAnalyzeSchema = z.object({
  weight: z.coerce
    .number({ message: 'Вес обязаьелен' })
    .min(1, 'Вес должен быть больше 1 кг'),
  height: z.coerce
    .number({ message: 'Рост обязаьелен' })
    .min(50, 'Рост должен быть больше 50 см'),

  gender: z.enum(Object.values(Gender) as [string, ...string[]], {
    required_error: 'Укажите пол',
  }),

  birthDate: z.coerce.date({
    required_error: 'Укажите дату рождения',
    invalid_type_error: 'Некорректная дата',
  }),

  activityLevel: z.enum(Object.values(ActivityLevel) as [string, ...string[]], {
    required_error: 'Укажите уровень активности',
  }),

  weightGoal: z.enum(Object.values(WeightGoal) as [string, ...string[]], {
    required_error: 'Укажите цель',
  }),

  bodyFatPercent: z.coerce.number().min(0).max(80).optional().nullable(),
});

export type UserMakeTDEEAnalyzeFormData = z.infer<
  typeof userMakeTDEEAnalyzeSchema
>;

export const userMakeTDEEAnalyzeResolver = zodResolver(
  userMakeTDEEAnalyzeSchema,
);

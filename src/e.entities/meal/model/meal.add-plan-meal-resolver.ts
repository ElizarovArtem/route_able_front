import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const createAddPlanMealSchema = z.object({
  planMealText: z.string({ required_error: 'Описание блюда обязательно' }),
  planProtein: z.coerce.number({ required_error: 'Кол-во белков обязательно' }),
  planFat: z.coerce.number({ required_error: 'Кол-во жиров обязательно' }),
  planCarbs: z.coerce.number({
    required_error: 'Кол-во углеводов обязательно',
  }),
  planCalories: z.coerce.number({
    required_error: 'Кол-во калорий обязательно',
  }),
  planMealDate: z.date({
    required_error: 'Дата планового приема пищи обязательна',
  }),
});

export type TAddPlanMealFormData = z.infer<typeof createAddPlanMealSchema>;

export const addPlanMealFormResolver = zodResolver(createAddPlanMealSchema);

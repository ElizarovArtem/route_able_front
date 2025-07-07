import type { MealType } from '@/constants/meal';

export type TMeal = {
  id: string;
  date: string;
  mealType: MealType;
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
};

// Requests

export type TCreateMealReq = Partial<Omit<TMeal, 'date' | 'name' | 'id'>> & {
  date: string;
  name: string;
};

// Responses

export type TGetDayMealsSummaryRes = {
  date: string;
  summary: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
  meals: TMeal[];
};

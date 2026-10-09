export type TMeal = {
  id: string;
  date: string;
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
};

export enum NutritionType {
  calories = 'calories',
  carbs = 'carbs',
  fat = 'fat',
  protein = 'protein',
  name = 'name',
}

export type NutritionBlock = {
  date: string;
  summary: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
  goals: {
    personal: {
      calories: number | null;
      protein: number | null;
      fat: number | null;
      carbs: number | null;
    } | null;
    coaches: {
      clientCoachId: string;
      coachId: string;
      coachName: string | null;
      calories: number | null;
      protein: number | null;
      fat: number | null;
      carbs: number | null;
    }[];
  };
};

export type DayMealsSummary = NutritionBlock & {
  meals: TMeal[];
};

export type GetPlannedMealsRequest = {
  date: string;
  relationId?: string;
};

export type GetPlannedMealsResponse = {
  authorId: string;
  calories: number;
  carbs: number;
  clientCoachId: string;
  clientId: string;
  coachId: string;
  completedAt: string;
  createdAt: string;
  date: string;
  fat: number;
  id: string;
  isCompleted: false;
  protein: number;
  text: string;
  updatedAt: string;
}[];

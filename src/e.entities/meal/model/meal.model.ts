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

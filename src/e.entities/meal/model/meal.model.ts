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

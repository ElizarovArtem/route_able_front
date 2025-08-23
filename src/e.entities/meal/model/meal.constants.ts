import { NutritionType } from './meal.model.ts';

export const NUTRITION_DICTIONARY: Record<NutritionType, string> = {
  [NutritionType.calories]: 'Каллории',
  [NutritionType.carbs]: 'Углеводы',
  [NutritionType.fat]: 'Жиры',
  [NutritionType.protein]: 'Белки',
  [NutritionType.name]: 'Название',
};

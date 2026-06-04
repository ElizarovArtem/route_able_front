import type { TCreateMealFormData } from '@/d.features/meal';
import type { TProductByBarcode } from '@/e.entities/product';

export const calculateMealNutrition = (
  product: TProductByBarcode,
  grams: number,
): TCreateMealFormData => {
  const multiplier = Math.max(grams, 1) / 100;

  return {
    name: product.name,
    calories: roundNutrition(product.caloriesPer100g * multiplier),
    protein: roundNutrition(product.proteinPer100g * multiplier),
    fat: roundNutrition(product.fatPer100g * multiplier),
    carbs: roundNutrition(product.carbsPer100g * multiplier),
  };
};

const roundNutrition = (value: number) => Number(value.toFixed(2));

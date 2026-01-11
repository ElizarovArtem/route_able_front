import React from 'react';

import type { TMeal } from '@/e.entities/meal';
import { UiCard, UiFlex, UiTypography } from '@/f.shared/ui';

type TMealItemProps = {
  meal: TMeal;
};

export const MealItem = ({ meal }: TMealItemProps) => {
  return (
    <UiCard inverse>
      <UiFlex justify="space-between">
        <UiFlex direction="column">
          <UiTypography type="label" size="small">
            Название
          </UiTypography>
          <UiTypography>{meal.name}</UiTypography>
        </UiFlex>
        <UiFlex direction="column">
          <UiTypography type="label" size="small">
            Калории
          </UiTypography>
          <UiTypography>{meal.calories}</UiTypography>
        </UiFlex>
        <UiFlex direction="column">
          <UiTypography type="label" size="small">
            Белки
          </UiTypography>
          <UiTypography>{meal.protein}</UiTypography>
        </UiFlex>
        <UiFlex direction="column">
          <UiTypography type="label" size="small">
            Жиры
          </UiTypography>
          <UiTypography>{meal.fat}</UiTypography>
        </UiFlex>
        <UiFlex direction="column">
          <UiTypography type="label" size="small">
            Углеводы
          </UiTypography>
          <UiTypography>{meal.carbs}</UiTypography>
        </UiFlex>
      </UiFlex>
    </UiCard>
  );
};

import React from 'react';

import { UiCard, UiTypography } from '@/f.shared/ui';

type NutritionCardProps = {
  label: string;
  value: number;
};

export const NutritionCard = ({ label, value }: NutritionCardProps) => (
  <UiCard>
    <UiTypography size="small" type="label">
      {label}
    </UiTypography>
    <UiTypography>{value}</UiTypography>
  </UiCard>
);

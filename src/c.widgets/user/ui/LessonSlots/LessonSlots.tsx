import React from 'react';

import { UiButton, UiCard, UiFlex, UiTypography } from '@/f.shared/ui';

export const LessonSlots = () => {
  return (
    <UiCard>
      <UiFlex align="center" justify="space-between">
        <UiTypography bold>Свободные слоты</UiTypography>
        <UiButton>Добавить слот</UiButton>
      </UiFlex>
    </UiCard>
  );
};

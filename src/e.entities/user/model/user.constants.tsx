import { Tooltip } from 'antd';
import type { DefaultOptionType } from 'rc-select/lib/Select';
import React from 'react';

import {
  ActivityLevel,
  CoachVerificationStatus,
  Gender,
  WeightGoal,
} from '@/e.entities/user/model/user.enums.ts';

export const GenderMap = {
  [Gender.Female]: 'Женский',
  [Gender.Male]: 'Мужской',
};

export const WeightGoalMap = {
  [WeightGoal.LOSE]: 'Снизить вес',
  [WeightGoal.GAIN]: 'Увеличить вес',
  [WeightGoal.MAINTAIN]: 'Поддержать вес',
};

export const ActivityLevelMap = {
  [ActivityLevel.SEDENTARY]: 'Минимум активности',
  [ActivityLevel.LIGHT]: '1–2 тренировки в неделю',
  [ActivityLevel.MODERATE]: '3-5 тренировки в неделю',
  [ActivityLevel.ACTIVE]: '6-7 тренировки в неделю',
  [ActivityLevel.VERY_ACTIVE]: '2-разовые тренировки, тяжёлый физ. труд',
};

export const GOAl_OPTIONS: DefaultOptionType[] = [
  { value: WeightGoal.LOSE, label: 'Уменьшить вес' },
  { value: WeightGoal.MAINTAIN, label: 'Поддержать вес' },
  { value: WeightGoal.GAIN, label: 'Увеличить вес' },
];

export const ACTIVITY_OPTIONS: DefaultOptionType[] = [
  {
    value: ActivityLevel.SEDENTARY,
    label: (
      <Tooltip trigger="hover" title="Минимум активности">
        Минимум активности
      </Tooltip>
    ),
  },
  {
    value: ActivityLevel.LIGHT,
    label: (
      <Tooltip trigger="hover" title="1–2 тренировки в неделю">
        <div>Легкая</div>
      </Tooltip>
    ),
  },
  {
    value: ActivityLevel.MODERATE,
    label: (
      <Tooltip trigger="hover" title="3-5 тренировки в неделю">
        <div>Средняя</div>
      </Tooltip>
    ),
  },
  {
    value: ActivityLevel.ACTIVE,
    label: (
      <Tooltip trigger="hover" title="6-7 тренировок в неделю">
        <div>Большая</div>
      </Tooltip>
    ),
  },
  {
    value: ActivityLevel.VERY_ACTIVE,
    label: (
      <Tooltip trigger="hover" title="2-разовые тренировки, тяжёлый физ. труд">
        <div>Очень большая</div>
      </Tooltip>
    ),
  },
];

export const VERIFICATION_STATUS: Record<CoachVerificationStatus, string> = {
  [CoachVerificationStatus.APPROVED]: 'Принято',
  [CoachVerificationStatus.REJECTED]: 'Отклонено',
  [CoachVerificationStatus.PENDING]: 'В ожидании',
};

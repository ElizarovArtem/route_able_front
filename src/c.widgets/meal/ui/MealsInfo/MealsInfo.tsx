import { format } from 'date-fns';
import React, { useState } from 'react';

import { AddMealModal } from '@/d.features/meal';
import { UpdateUserFatGoals } from '@/d.features/user/ui/UpdateUserFatGoals/UpdateUserFatGoals.tsx';
import { FatSummary, useGetMealByDay } from '@/e.entities/meal';
import { MealItem } from '@/e.entities/meal/ui/MealItem/MealItem.tsx';
import {
  AppleIcon,
  PlusIcon,
  SettingsIcon,
  UiButton,
  UiCard,
  UiFlex,
  UiSectionHeader,
  UiTypography,
} from '@/f.shared/ui';

import styles from './MealsInfo.module.scss';

export const MealsInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateGoalsModalOpen, setUpdateGoalsIsModalOpen] = useState(false);

  const date = format(new Date(), 'yyyy-MM-dd');
  const { data, refetch } = useGetMealByDay(date);

  const onUpdateFatGoalsSuccess = () => {
    setUpdateGoalsIsModalOpen(false);
    refetch();
  };

  const calories = data?.summary?.calories ?? 0;
  const calorieGoal = data?.goals?.personal?.calories;

  return (
    <UiCard>
      <UiSectionHeader
        icon={<AppleIcon size={18} />}
        title="Питание"
        subtitle={calorieGoal ? `${calories} из ${calorieGoal} ккал` : `${calories} ккал сегодня`}
        action={
          <UiFlex gap="xs" align="center">
            <UiButton
              styleType="secondary"
              size="middle"
              icon={<SettingsIcon size={15} />}
              title="Настроить цели"
              onClick={() => setUpdateGoalsIsModalOpen(true)}
            />
            <UiButton
              size="middle"
              icon={<PlusIcon size={14} />}
              onClick={() => setIsModalOpen(true)}
            >
              Добавить
            </UiButton>
          </UiFlex>
        }
      />

      <div className={styles.body}>
        <FatSummary data={data?.summary} goals={data?.goals} circlesSize={90} />

        <UiFlex direction="column" gap="xs">
          {data?.meals?.length ? (
            data.meals.map((meal) => <MealItem key={meal.id} meal={meal} />)
          ) : (
            <UiTypography type="label">Приёмов пищи пока нет — добавь первый.</UiTypography>
          )}
        </UiFlex>
      </div>

      <AddMealModal
        refetch={refetch}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        setIsOpen={setIsModalOpen}
      />
      <UpdateUserFatGoals
        goals={data?.goals.personal}
        open={isUpdateGoalsModalOpen}
        onSuccess={onUpdateFatGoalsSuccess}
        onCancel={() => setUpdateGoalsIsModalOpen(false)}
      />
    </UiCard>
  );
};

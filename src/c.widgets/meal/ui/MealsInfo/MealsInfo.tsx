import { format } from 'date-fns';
import React, { useState } from 'react';

import { AddMealModal } from '@/d.features/meal';
import { UpdateUserFatGoals } from '@/d.features/user/ui/UpdateUserFatGoals/UpdateUserFatGoals.tsx';
import { FatSummary, useGetMealByDay } from '@/e.entities/meal';
import { MealItem } from '@/e.entities/meal/ui/MealItem/MealItem.tsx';
import { UiButton, UiCard, UiFlex } from '@/f.shared/ui';

export const MealsInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateGoalsModalOpen, setUpdateGoalsIsModalOpen] = useState(false);

  const date = format(new Date(), 'yyyy-MM-dd');

  const { data, refetch } = useGetMealByDay(date);

  const onUpdateFatGoalsSuccess = () => {
    setUpdateGoalsIsModalOpen(false);
    refetch();
  };

  return (
    <UiCard>
      <UiFlex direction="column">
        <FatSummary data={data?.summary} goals={data?.goals} />

        <UiFlex direction="column">
          {data?.meals.map((meal) => <MealItem key={meal.id} meal={meal} />)}
        </UiFlex>

        <UiFlex justify="end">
          <UiButton onClick={() => setUpdateGoalsIsModalOpen(true)}>
            Обновить цели
          </UiButton>
          <UiButton onClick={() => setIsModalOpen(true)}>
            Добавить прием пищи
          </UiButton>
        </UiFlex>
      </UiFlex>

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

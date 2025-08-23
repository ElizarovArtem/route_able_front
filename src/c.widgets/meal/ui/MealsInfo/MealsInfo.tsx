import { format } from 'date-fns';
import React, { useState } from 'react';

import { AddMealModal } from '@/d.features/meal';
import {
  MealsList,
  MealsSummaryPerDay,
  useGetMealByDay,
} from '@/e.entities/meal';
import { UiButton } from '@/f.shared/ui';

import styles from './MealsInfo.module.scss';

export const MealsInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const date = format(new Date(), 'yyyy-MM-dd');

  const { data, refetch } = useGetMealByDay(date);

  return (
    <div className={styles.info}>
      <MealsSummaryPerDay data={data?.summary || null} />
      <MealsList data={data?.meals || []} />
      <div className={styles.buttonWrapper}>
        <UiButton onClick={() => setIsModalOpen(true)}>
          Добавить прием пищи
        </UiButton>
      </div>

      <AddMealModal
        refetch={refetch}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        setIsOpen={setIsModalOpen}
      />
    </div>
  );
};

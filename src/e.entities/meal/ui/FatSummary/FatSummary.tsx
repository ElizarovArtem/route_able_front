import type { DefaultOptionType } from 'rc-select/lib/Select';
import React, { useMemo, useState } from 'react';

import type { GetDayMealsSummaryRes } from '@/e.entities/meal';
import { UiFlex, UiSelector, UiTypography } from '@/f.shared/ui';
import { UiProgress } from '@/f.shared/ui/UiProgress/UiProgress.tsx';

import styles from './FatSummary.module.scss';

type FatSummaryProps = {
  data?: GetDayMealsSummaryRes['summary'];
  goals?: GetDayMealsSummaryRes['goals'];
};

const PERSONAL_OPTION_VALUE = 'personal';

export const FatSummary = ({ data, goals }: FatSummaryProps) => {
  const [goalsSource, setGoalsSource] = useState<string>(PERSONAL_OPTION_VALUE);

  const options: DefaultOptionType[] = useMemo(() => {
    const coachOptions: DefaultOptionType[] = [];

    if (goals) {
      goals.coaches.map((coach) => ({
        value: `coach-${coach.coachId}`,
        label: coach.coachName,
      }));
    }

    return [
      { value: PERSONAL_OPTION_VALUE, label: 'Личные цели' },
      ...coachOptions,
    ];
  }, [goals]);

  const goalsConfig = useMemo(() => {
    if (goalsSource === PERSONAL_OPTION_VALUE) {
      return {
        calories: goals?.personal?.calories,
        carbs: goals?.personal?.carbs,
        fat: goals?.personal?.fat,
        protein: goals?.personal?.protein,
      };
    } else {
      const coachId = goalsSource.split('-')[1];
      const coachGoals = goals?.coaches.find(
        (coach) => coach.coachId === coachId,
      );

      return {
        calories: coachGoals?.calories || 0,
        carbs: coachGoals?.carbs || 0,
        fat: coachGoals?.fat || 0,
        protein: coachGoals?.protein || 0,
      };
    }
  }, [goalsSource, goals]);

  return (
    <UiFlex direction="column" align="center">
      <UiFlex align="center" justify="start">
        {goals && (
          <UiSelector
            defaultValue="personal"
            options={options}
            style={{ width: 150 }}
            onChange={setGoalsSource}
          />
        )}
        <UiTypography bold>Всего за день</UiTypography>
      </UiFlex>
      <UiFlex
        justify="center"
        wrap="wrap"
        align="center"
        className={styles.progressWrapper}
      >
        <UiProgress
          type="circle"
          percent={((data?.calories || 0) * 100) / (goalsConfig.calories || 0)}
          size={90}
          format={() => (
            <UiFlex direction="column" gap="xxs">
              <UiTypography>{data?.calories}</UiTypography>
              <UiTypography size="small">
                из {goalsConfig.calories}
              </UiTypography>
              <UiTypography size="small">Кал</UiTypography>
            </UiFlex>
          )}
        />
        <UiProgress
          type="circle"
          percent={((data?.protein || 0) * 100) / (goalsConfig.protein || 0)}
          size={90}
          format={() => (
            <UiFlex direction="column" gap="xxs">
              <UiTypography>{data?.protein}</UiTypography>
              <UiTypography size="small">из {goalsConfig.protein}</UiTypography>
              <UiTypography size="small">Белки</UiTypography>
            </UiFlex>
          )}
        />
        <UiProgress
          type="circle"
          percent={((data?.fat || 0) * 100) / (goalsConfig.fat || 0)}
          size={90}
          format={() => (
            <UiFlex direction="column" gap="xxs">
              <UiTypography>{data?.fat}</UiTypography>
              <UiTypography size="small">из {goalsConfig.fat}</UiTypography>
              <UiTypography size="small">Жиры</UiTypography>
            </UiFlex>
          )}
        />
        <UiProgress
          type="circle"
          percent={((data?.carbs || 0) * 100) / (goalsConfig.carbs || 0)}
          size={90}
          format={() => (
            <UiFlex direction="column" gap="xxs">
              <UiTypography>{data?.carbs}</UiTypography>
              <UiTypography size="small">из {goalsConfig.carbs}</UiTypography>
              <UiTypography size="small">Углеводы</UiTypography>
            </UiFlex>
          )}
        />
      </UiFlex>
    </UiFlex>
  );
};

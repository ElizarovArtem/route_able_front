import classNames from 'classnames';
import { format } from 'date-fns';
import React, { useMemo, useState } from 'react';

import { useRepeatAiWorkoutSession } from '@/d.features/aiAssistant';
import { useDeleteAiWorkoutTemplate } from '@/d.features/aiAssistant/api/queries/useDeleteAiWorkoutTemplate.ts';
import {
  type AiWorkoutSession,
  AiWorkoutStatus,
} from '@/e.entities/aiAssistant';
import { useGetMyAiWorkouts } from '@/e.entities/aiAssistant/api/queries/useGetMyAiWorkouts.ts';
import { useGetMyAiWorkoutsHistory } from '@/e.entities/aiAssistant/api/queries/useGetMyAiWorkoutsHistory.ts';
import { WORKOUT_MAP } from '@/e.entities/aiAssistant/model/aiAssistant.constants.ts';
import type {
  AiSessionTemplate,
  AiWorkoutHistoryItem,
} from '@/e.entities/aiAssistant/model/aiAssistant.model.ts';
import {
  UiButton,
  UiCard,
  UiFlex,
  UiLoaderContainer,
  UiTypography,
} from '@/f.shared/ui';

import styles from './TemplatesList.module.scss';

type TemplatesListProps = {
  aiWorkout?: AiWorkoutSession;
  onDeleteTemplateSuccess: () => void;
  onRepeatWorkoutSuccess: (data: AiWorkoutSession) => void;
  onWorkoutContinueClick: (workout: AiWorkoutHistoryItem) => void;
};

export const TemplatesList = ({
  aiWorkout,
  onDeleteTemplateSuccess,
  onRepeatWorkoutSuccess,
  onWorkoutContinueClick,
}: TemplatesListProps) => {
  const [exercisesPreviewSessionId, setExercisesPreviewSessionId] = useState<
    string | null
  >(null);

  const { data: myWorkoutTemplates, isPending: templatesPending } =
    useGetMyAiWorkouts();
  const { data: myWorkoutHistory, isPending: historyPending } =
    useGetMyAiWorkoutsHistory();

  const workoutToContinue = useMemo((): AiWorkoutHistoryItem | undefined => {
    return (myWorkoutHistory || []).find(
      (historyItem, index) =>
        index === 0 && historyItem.status === AiWorkoutStatus.IN_PROGRESS,
    );
  }, [myWorkoutHistory]);

  const onWorkoutSelect = (workout: AiSessionTemplate) => {
    setExercisesPreviewSessionId((prevState) => {
      if (prevState === workout.templateId) return null;
      return workout.templateId;
    });
  };

  const { mutate: repeatMutation } = useRepeatAiWorkoutSession({
    onSuccess: onRepeatWorkoutSuccess,
  });

  const { mutate: deleteTemplateMutation } = useDeleteAiWorkoutTemplate({
    onSuccess: onDeleteTemplateSuccess,
  });

  const onDeleteWorkoutTemplate = (
    templateId: string,
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    deleteTemplateMutation({ templateId });
  };

  const onWorkoutRepeat = (
    sessionId: string,
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    repeatMutation({ sessionId });
  };

  return (
    <UiFlex direction="column">
      {workoutToContinue && (
        <UiFlex justify="start">
          <UiFlex direction="column" gap="xs">
            <UiTypography bold>Вы не закончили тренировку:</UiTypography>
            <UiCard inverse>
              <UiFlex>
                <UiTypography label="Промпт">
                  {workoutToContinue.userIntent}
                </UiTypography>
                <UiTypography label="Статус">
                  {WORKOUT_MAP[workoutToContinue.status]}
                </UiTypography>
                <UiTypography label="Дата тренировки">
                  {format(workoutToContinue.date, 'dd.MM.yyyy')}
                </UiTypography>
                <UiButton
                  onClick={() => onWorkoutContinueClick(workoutToContinue)}
                >
                  Продолжить
                </UiButton>
              </UiFlex>
            </UiCard>
          </UiFlex>
        </UiFlex>
      )}
      <UiFlex childrenEqualLength justify="center">
        <UiLoaderContainer isLoading={templatesPending}>
          {myWorkoutTemplates && !aiWorkout && (
            <UiFlex direction="column" gap="xs">
              {myWorkoutTemplates.length ? (
                <>
                  <UiTypography>Шаблоны</UiTypography>
                  {myWorkoutTemplates.map((workoutTemplate) => (
                    <UiCard
                      key={workoutTemplate.templateId}
                      inverse
                      onClick={() => onWorkoutSelect(workoutTemplate)}
                      className={styles.workoutItem}
                    >
                      <UiFlex direction="column">
                        <UiFlex align="center" justify="space-between">
                          <UiTypography>
                            {workoutTemplate.userIntent}
                          </UiTypography>
                          <div
                            className={classNames(styles.collapse, {
                              [styles.collapseOpen]:
                                exercisesPreviewSessionId ===
                                workoutTemplate.templateId,
                            })}
                          />
                        </UiFlex>
                        {exercisesPreviewSessionId ===
                          workoutTemplate.templateId && (
                          <UiFlex direction="column" gap="xs">
                            {workoutTemplate.exercises.map((exercise) => (
                              <UiCard inverse key={exercise.id}>
                                <UiFlex>
                                  <UiTypography>{exercise.name}</UiTypography>
                                  <UiTypography>
                                    {exercise.targetMuscle}
                                  </UiTypography>
                                  <UiTypography>
                                    {exercise.setsPlanned}
                                  </UiTypography>
                                  <UiTypography>
                                    {exercise.repsPerSet}
                                  </UiTypography>
                                </UiFlex>
                              </UiCard>
                            ))}
                            <UiFlex justify="end">
                              <UiButton
                                styleType="danger"
                                onClick={(event) =>
                                  onDeleteWorkoutTemplate(
                                    workoutTemplate.templateId,
                                    event,
                                  )
                                }
                              >
                                Удалить
                              </UiButton>
                              <UiButton
                                onClick={(event) =>
                                  onWorkoutRepeat(
                                    workoutTemplate.templateId,
                                    event,
                                  )
                                }
                              >
                                Повторить
                              </UiButton>
                            </UiFlex>
                          </UiFlex>
                        )}
                      </UiFlex>
                    </UiCard>
                  ))}
                </>
              ) : (
                <UiFlex justify="center">
                  <UiTypography size="large">
                    Создайте свою первую тренировку!
                  </UiTypography>
                </UiFlex>
              )}
            </UiFlex>
          )}
        </UiLoaderContainer>
        <UiLoaderContainer isLoading={historyPending}>
          {myWorkoutHistory && myWorkoutHistory.length > 0 && (
            <UiCard inverse className={styles.historyWrapper}>
              <UiFlex direction="column" gap="xs">
                <UiTypography>История</UiTypography>
                <UiFlex
                  direction="column"
                  gap="xs"
                  className={styles.historyList}
                >
                  {myWorkoutHistory.map((historyItem) => {
                    return (
                      <UiCard key={historyItem.id}>
                        <UiFlex childrenEqualLength align="center">
                          <UiTypography label="Промпт">
                            {historyItem.userIntent}
                          </UiTypography>
                          <UiTypography label="Статус">
                            {WORKOUT_MAP[historyItem.status]}
                          </UiTypography>
                          <UiTypography label="Дата тренировки">
                            {format(historyItem.date, 'dd.MM.yyyy')}
                          </UiTypography>
                        </UiFlex>
                      </UiCard>
                    );
                  })}
                </UiFlex>
              </UiFlex>
            </UiCard>
          )}
        </UiLoaderContainer>
      </UiFlex>
    </UiFlex>
  );
};

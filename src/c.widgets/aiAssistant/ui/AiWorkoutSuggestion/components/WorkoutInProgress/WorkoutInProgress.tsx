import type { DefaultOptionType } from 'rc-select/lib/Select';
import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { AiAssistant } from '@/c.widgets/aiAssistant';
import styles from '@/c.widgets/aiAssistant/ui/aiAssistant/aiAssistant.module.scss';
import { useCompleteAiWorkoutSet } from '@/d.features/aiAssistant';
import {
  type AiWorkoutExercise,
  AiWorkoutExerciseStatus,
  type AiWorkoutSession,
} from '@/e.entities/aiAssistant';
import {
  EXERCISE_VIEWS,
  ViewAngle,
} from '@/e.entities/aiAssistant/model/aiAssistant.model.ts';
import { UiButton, UiFlex, UiSelector, UiTypography } from '@/f.shared/ui';
import { UiProgress } from '@/f.shared/ui/UiProgress/UiProgress.tsx';

type WorkoutInProgressProps = {
  aiWorkout: AiWorkoutSession;
  currentExercise: AiWorkoutExercise;
  setCurrentExercise: Dispatch<SetStateAction<AiWorkoutExercise | null>>;
  onCompleteSetSuccess: (nextExercise?: AiWorkoutExercise) => void;
};

export const WorkoutInProgress = ({
  aiWorkout,
  currentExercise,
  setCurrentExercise,
  onCompleteSetSuccess,
}: WorkoutInProgressProps) => {
  const [isSetStarted, setIsSetStarted] = useState<boolean>(false);
  const [isRest, setIsRest] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  const viewOptions = useMemo((): DefaultOptionType[] => {
    return currentExercise.exerciseKey
      ? (EXERCISE_VIEWS[currentExercise.exerciseKey] || []).map((view) => ({
          value: view,
          label: view === ViewAngle.side ? 'Сбоку' : 'Спереди',
        }))
      : [];
  }, [currentExercise]);

  const [view, setView] = useState<ViewAngle>(
    (viewOptions[0]?.value || ViewAngle.side) as ViewAngle,
  );

  const { mutate: completeSetMutation } = useCompleteAiWorkoutSet({
    onSuccess: (data) => {
      if (data.status === AiWorkoutExerciseStatus.COMPLETED) {
        const nextExercise = aiWorkout?.exercises.find(
          (exercise) => exercise.order === aiWorkout?.currentExerciseIndex + 1,
        );

        onCompleteSetSuccess(nextExercise);

        setCurrentExercise(nextExercise ?? null);
      } else {
        setCurrentExercise(data);
      }

      setIsRest(true);
    },
  });

  const onStartSet = () => {
    setIsSetStarted(true);
    setIsRest(false);
  };

  const onEndSet = () => {
    setIsSetStarted(false);
    if (
      aiWorkout?.id &&
      currentExercise?.id &&
      currentExercise.status !== AiWorkoutExerciseStatus.COMPLETED
    ) {
      completeSetMutation({
        sessionId: aiWorkout.id,
        exerciseId: currentExercise.id,
      });
    }
  };

  useEffect(() => {
    let intervalId: number | undefined;

    if (isRest) {
      intervalId = setInterval(
        () =>
          setTime((prevState) => {
            if (prevState < (currentExercise.restSeconds || 10000)) {
              return prevState + 1;
            } else {
              return prevState;
            }
          }),
        1000,
      );
    }

    return () => {
      clearInterval(intervalId);
      setTime(0);
    };
  }, [isRest]);

  if (!currentExercise) return null;

  return (
    <UiFlex direction="column" gap="m" align="center">
      <UiTypography bold size="large">
        {aiWorkout?.userIntent}
      </UiTypography>
      <UiFlex align="center">
        <UiTypography>{currentExercise.name}</UiTypography>
        <UiTypography>
          Выполнено {currentExercise.setsCompleted} из{' '}
          {currentExercise.setsPlanned}
        </UiTypography>
        <UiTypography>{currentExercise.repsPerSet} Раз</UiTypography>
        {viewOptions.length > 0 && (
          <UiSelector
            className={styles.selector}
            options={viewOptions}
            onChange={setView}
            placeholder="Выберите вид"
          />
        )}
        <UiFlex justify="end">
          <UiButton onClick={isSetStarted ? onEndSet : onStartSet}>
            {isSetStarted ? 'Завершить подход' : 'Начать подход'}
          </UiButton>
        </UiFlex>
      </UiFlex>
      {isSetStarted && currentExercise.exerciseKey && (
        <AiAssistant
          needHeader={false}
          externalMode={currentExercise.exerciseKey}
          externalView={view}
          externalStart={isSetStarted}
        />
      )}
      {isRest && (
        <UiFlex justify="center">
          <UiProgress
            type="circle"
            percent={
              currentExercise.restSeconds
                ? (time * 100) / currentExercise.restSeconds
                : 0
            }
            size={250}
            format={(percent) => (
              <UiTypography>
                {percent! < 100 ? (
                  <UiFlex direction="column" gap="xs">
                    <UiTypography size="large">Отдых</UiTypography>
                    <UiTypography size="large">{time}</UiTypography>
                  </UiFlex>
                ) : (
                  'Можно начинать подход'
                )}
              </UiTypography>
            )}
          />
        </UiFlex>
      )}
    </UiFlex>
  );
};

import React from 'react';

import { useStartAiWorkoutSession } from '@/d.features/aiAssistant';
import { useDeleteAiWorkoutSession } from '@/d.features/aiAssistant/api/queries/useDeleteAiWorkoutSession.ts';
import type { AiWorkoutSession } from '@/e.entities/aiAssistant';
import { UiButton, UiCard, UiFlex, UiTypography } from '@/f.shared/ui';

type WorkoutPreviewProps = {
  aiWorkout: AiWorkoutSession;
  onStartAiWorkoutSuccess: (data: AiWorkoutSession) => void;
  onDeleteAiWorkoutSessionSuccess: () => void;
};

export const WorkoutPreview = ({
  aiWorkout,
  onStartAiWorkoutSuccess,
  onDeleteAiWorkoutSessionSuccess,
}: WorkoutPreviewProps) => {
  const { mutate: startMutation } = useStartAiWorkoutSession({
    onSuccess: onStartAiWorkoutSuccess,
  });

  const { mutate: deleteSessionMutation } = useDeleteAiWorkoutSession({
    onSuccess: onDeleteAiWorkoutSessionSuccess,
  });

  const onWorkoutStart = () => {
    if (aiWorkout?.id) {
      startMutation({ sessionId: aiWorkout.id });
    }
  };

  const onDeleteWorkoutSession = (
    sessionId: string,
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    deleteSessionMutation({ sessionId });
  };

  return (
    <UiFlex direction="column" gap="s">
      <UiTypography bold size="large">
        {aiWorkout.userIntent}
      </UiTypography>
      <UiTypography>Упражнения</UiTypography>
      <UiFlex direction="column" gap="xs">
        {aiWorkout.exercises.map((exercise) => (
          <UiCard inverse key={exercise.id}>
            <UiFlex>
              <UiTypography>{exercise.name}</UiTypography>
              <UiTypography>{exercise.targetMuscle}</UiTypography>
              <UiTypography>{exercise.setsPlanned}</UiTypography>
              <UiTypography>{exercise.repsPerSet}</UiTypography>
            </UiFlex>
          </UiCard>
        ))}
      </UiFlex>
      <UiFlex justify="center">
        <UiButton onClick={onWorkoutStart}>Начать</UiButton>
        <UiButton
          onClick={(event) => onDeleteWorkoutSession(aiWorkout.id!, event)}
        >
          Отменить
        </UiButton>
      </UiFlex>
    </UiFlex>
  );
};

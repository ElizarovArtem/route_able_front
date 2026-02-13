import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import { useSetAiWorkoutCurrentExercise } from '@/d.features/aiAssistant';
import {
  type AiWorkoutExercise,
  type AiWorkoutSession,
  useGetAiWorkoutSession,
} from '@/e.entities/aiAssistant';
import { useContinueAiWorkoutSession } from '@/e.entities/aiAssistant/api/queries/useGetContinueAiWorkoutSession.ts';
import type { AiWorkoutHistoryItem } from '@/e.entities/aiAssistant/model/aiAssistant.model.ts';
import { UiButton, UiCard, UiFlex, UiTypography } from '@/f.shared/ui';

import { GenerateAiWorkout } from './components/GenerateAiWorkout';
import { TemplatesList } from './components/TemplatesList';
import { WorkoutInProgress } from './components/WorkoutInProgress';
import { WorkoutPreview } from './components/WorkoutPreview';

enum AiWorkoutContent {
  createWorkout = 'createWorkout',
  workoutPreview = 'workoutPreview',
  workout = 'workout',
  workoutCompleted = 'workoutCompleted',
}

export const AiWorkoutSuggestion = () => {
  const [contentType, setContentType] = useState<AiWorkoutContent>(
    AiWorkoutContent.createWorkout,
  );

  const [currentExercise, setCurrentExercise] =
    useState<AiWorkoutExercise | null>(null);

  const [aiWorkoutTemplateId, setAiWorkoutTemplateId] = useState<string | null>(
    null,
  );
  const [aiContinueWorkoutId, setAiContinueWorkoutId] = useState<string | null>(
    null,
  );

  const queryClient = useQueryClient();

  const { data: aiWorkout, refetch: aiWorkoutRefetch } =
    useGetAiWorkoutSession(aiWorkoutTemplateId);

  const { refetch } = useContinueAiWorkoutSession(aiContinueWorkoutId);

  const onGenerateWorkoutSuccess = (data: AiWorkoutSession) => {
    setContentType(AiWorkoutContent.workoutPreview);
    setAiWorkoutTemplateId(data.id);
  };

  const onDeleteTemplateSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ['myAiWorkouts'],
    });
    queryClient.removeQueries({
      queryKey: ['aiWorkoutSession', aiWorkoutTemplateId],
    });
    queryClient.removeQueries({
      queryKey: ['myAiWorkoutsHistory'],
    });
    setContentType(AiWorkoutContent.createWorkout);
    setAiWorkoutTemplateId(null);
  };

  const onDeleteAiWorkoutSessionSuccess = () => {
    queryClient.removeQueries({
      queryKey: ['aiWorkoutSession', aiWorkoutTemplateId],
    });
    queryClient.removeQueries({
      queryKey: ['myAiWorkoutsHistory'],
    });
    setAiWorkoutTemplateId(null);
    setContentType(AiWorkoutContent.createWorkout);
  };

  const onStartAiWorkoutSuccess = (data: AiWorkoutSession) => {
    queryClient.invalidateQueries({
      queryKey: ['aiWorkoutSession', data.id],
    });

    const exercise = data.exercises.find(
      (exercise) => exercise.order === data.currentExerciseIndex,
    );

    if (exercise) {
      setCurrentExercise(exercise);
      setContentType(AiWorkoutContent.workout);
    }
  };

  const { mutate: setExerciseMutation } = useSetAiWorkoutCurrentExercise({
    onSuccess: () => {
      aiWorkoutRefetch();
    },
  });

  const onCompleteSetSuccess = (nextExercise?: AiWorkoutExercise) => {
    if (!nextExercise) {
      setCurrentExercise(null);
      setContentType(AiWorkoutContent.workoutCompleted);

      return;
    }

    if (aiWorkout?.id && currentExercise?.id && nextExercise) {
      setExerciseMutation({
        sessionId: aiWorkout.id,
        exerciseId: nextExercise.id,
      });

      setCurrentExercise(nextExercise);
    }
  };

  const onRepeatWorkoutSuccess = (data: AiWorkoutSession) => {
    setAiWorkoutTemplateId(data.sourceSessionId);
    setContentType(AiWorkoutContent.workoutPreview);
  };

  const onFinnishWorkout = () => {
    if (aiWorkout) {
      setAiWorkoutTemplateId(null);
      queryClient.removeQueries({
        queryKey: ['aiWorkoutSession', aiWorkout.id],
      });
      queryClient.removeQueries({
        queryKey: ['myAiWorkoutsHistory'],
      });
      setContentType(AiWorkoutContent.createWorkout);
    }
  };

  const onWorkoutContinueClick = async (workout: AiWorkoutHistoryItem) => {
    setAiContinueWorkoutId(workout.id);
  };

  useEffect(() => {
    const continueWorkoutHandler = async () => {
      const res = await refetch();
      if (res.data) {
        const currentExercise = res.data.exercises.find(
          (exercise) => exercise.order === res.data.currentExerciseIndex,
        );

        if (currentExercise) {
          setCurrentExercise(currentExercise);
          setContentType(AiWorkoutContent.workout);
          setAiContinueWorkoutId(null);
          setAiWorkoutTemplateId(res.data.sourceSessionId || res.data.id);
        }
      }
    };

    if (aiContinueWorkoutId) {
      continueWorkoutHandler();
    }
  }, [aiContinueWorkoutId]);

  return (
    <UiCard>
      <UiFlex direction="column">
        {contentType === AiWorkoutContent.createWorkout && (
          <>
            <GenerateAiWorkout onSuccess={onGenerateWorkoutSuccess} />

            <TemplatesList
              aiWorkout={aiWorkout}
              onDeleteTemplateSuccess={onDeleteTemplateSuccess}
              onRepeatWorkoutSuccess={onRepeatWorkoutSuccess}
              onWorkoutContinueClick={onWorkoutContinueClick}
            />
          </>
        )}

        {contentType === AiWorkoutContent.workoutPreview && aiWorkout && (
          <WorkoutPreview
            aiWorkout={aiWorkout}
            onDeleteAiWorkoutSessionSuccess={onDeleteAiWorkoutSessionSuccess}
            onStartAiWorkoutSuccess={onStartAiWorkoutSuccess}
          />
        )}

        {aiWorkout &&
          contentType === AiWorkoutContent.workout &&
          currentExercise && (
            <WorkoutInProgress
              aiWorkout={aiWorkout}
              currentExercise={currentExercise}
              setCurrentExercise={setCurrentExercise}
              onCompleteSetSuccess={onCompleteSetSuccess}
            />
          )}

        {contentType === AiWorkoutContent.workoutCompleted && (
          <UiFlex direction="column">
            <UiTypography>
              Тренировка окончена, теперь нужно хорошо подкрепиться
            </UiTypography>
            <UiButton onClick={onFinnishWorkout}>Завершить</UiButton>
          </UiFlex>
        )}
      </UiFlex>
    </UiCard>
  );
};

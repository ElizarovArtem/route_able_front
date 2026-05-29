import type { DefaultOptionType } from 'rc-select/lib/Select';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useCreateAiWorkoutPlan } from '@/d.features/aiAssistant';
import type { AiWorkoutSession } from '@/e.entities/aiAssistant';
import {
  type CreateAiWorkoutFormData,
  createAiWorkoutResolver,
} from '@/e.entities/aiAssistant/model/resolvers/create-workout.resolver.ts';
import { useMobile } from '@/f.shared/lib/useMobile.ts';
import { FormInput, FormSelect, UiButton, UiFlex } from '@/f.shared/ui';

const qualityOptions: DefaultOptionType[] = Array.from({ length: 10 }).map(
  (_, index) => ({ label: index + 1, value: index + 1 }),
);

type GenerateAiWorkoutProps = {
  onSuccess: (data: AiWorkoutSession) => void;
};

export const GenerateAiWorkout = ({ onSuccess }: GenerateAiWorkoutProps) => {
  const { control, handleSubmit } = useForm<CreateAiWorkoutFormData>({
    resolver: createAiWorkoutResolver,
  });

  const isMobile = useMobile();

  const { mutate: createWorkoutMutation, isPending } = useCreateAiWorkoutPlan({
    onSuccess,
  });

  const onWorkoutCreate = () => {
    handleSubmit((data) => {
      createWorkoutMutation({
        intent: data.intent,
        energyLevel: data.energyLevel,
        sleepQuality: data.sleepQuality,
        nutritionQuality: data.nutritionQuality,
      });
    })();
  };

  return (
    <UiFlex direction="column">
      <UiFlex childrenEqualLength direction={isMobile ? 'column' : 'row'}>
        <FormInput name="intent" label="Что хочу сделать?" control={control} />
        <FormSelect
          name="energyLevel"
          label="Уровень энергии"
          options={qualityOptions}
          control={control}
        />
        <FormSelect
          name="sleepQuality"
          label="Насколько хорошо поспал"
          options={qualityOptions}
          control={control}
        />
        <FormSelect
          name="nutritionQuality"
          label="Насколько хорошо поел"
          options={qualityOptions}
          control={control}
        />
      </UiFlex>
      <UiFlex justify="end">
        <UiButton onClick={onWorkoutCreate} loading={isPending}>
          Сформировать
        </UiButton>
      </UiFlex>
    </UiFlex>
  );
};

import React, { useEffect, useState } from 'react';

import type { TCreateMealFormData } from '@/d.features/meal';
import { useGetAiMealSuggestion } from '@/e.entities/meal/api/queries/useGetAiMealSuggestion.ts';
import { UiButton, UiInput, UiTypography } from '@/f.shared/ui';

import styles from './TextAiAddMealForm.module.scss';

type TextAiAddMealFormProps = {
  aiSuggestion: TCreateMealFormData | null;
  setAiSuggestion: (value: TCreateMealFormData) => void;
};

export const TextAiAddMealForm = ({
  aiSuggestion,
  setAiSuggestion,
}: TextAiAddMealFormProps) => {
  const [mealText, setMealText] = useState('');

  const { mutate } = useGetAiMealSuggestion({
    onSuccess: (data) => {
      setAiSuggestion(data);
    },
  });

  const onSubmit = () => {
    mutate(mealText);
  };

  useEffect(() => {
    return () => {
      setMealText('');
    };
  }, []);

  if (aiSuggestion) return null;

  return (
    <div className={styles.aiForm}>
      <UiTypography>
        Опишите ваш прием пищи, например: &#34;Съел индейку с рисом. Индейка 100
        грамм, рис 50 грамм&#34;
      </UiTypography>
      <UiInput
        value={mealText}
        onChange={(e) => setMealText(e.currentTarget.value)}
      />
      <UiButton disabled={!mealText} onClick={onSubmit}>
        Отправить
      </UiButton>
    </div>
  );
};

import React, { useEffect, useState } from 'react';

import type { TCreateMealFormData } from '@/d.features/meal';
import { useGetAiMealSuggestion } from '@/e.entities/meal/api/queries/useGetAiMealSuggestion.ts';
import { UiButton, UiInput } from '@/f.shared/ui';

import styles from './TextAiAddMealForm.module.scss';

type TextAiAddMealFormProps = {
  setAiSuggestion: (value: TCreateMealFormData) => void;
};

export const TextAiAddMealForm = ({
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

  return (
    <div className={styles.aiForm}>
      <div>
        Опишите ваш прием пищи, например: &#34;Съел индейку с рисом. Индейка 100
        грамм, рис 50 грамм&#34;
      </div>
      <UiInput
        value={mealText}
        onChange={(e) => setMealText(e.currentTarget.value)}
      />
      <UiButton onClick={onSubmit}>Отправить</UiButton>
    </div>
  );
};

import type { RefetchOptions } from '@tanstack/query-core';
import { type QueryObserverResult } from '@tanstack/react-query';
import type { ModalProps } from 'antd';
import type { TabsProps } from 'antd/es/tabs';
import { format } from 'date-fns';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  mealFormResolver,
  type TCreateMealFormData,
  useAddMeal,
} from '@/d.features/meal';
import {
  ManualAddMealForm,
  NUTRITION_DICTIONARY,
  NutritionType,
  PhotoAiAddMealForm,
  TextAiAddMealForm,
  type TGetDayMealsSummaryRes,
} from '@/e.entities/meal';
import { UiButton, UiModal } from '@/f.shared/ui';
import { UiTabs } from '@/f.shared/ui/UiTabs/UiTabs.tsx';

import styles from './AddMealModal.module.scss';

enum TabsKeys {
  manual = 'manual',
  text = 'text',
  photo = 'photo',
}

type TMealFormProps = {
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<TGetDayMealsSummaryRes, Error>>;
  setIsOpen: (isOpen: boolean) => void;
} & ModalProps;

export const AddMealModal = ({
  refetch,
  setIsOpen,
  onCancel,
  ...props
}: TMealFormProps) => {
  const [currentTab, setCurrentTab] = useState<TabsKeys>(TabsKeys.manual);
  const [aiSuggestion, setAiSuggestion] = useState<TCreateMealFormData | null>(
    null,
  );

  const { control, handleSubmit, reset } = useForm<TCreateMealFormData>({
    resolver: mealFormResolver,
  });

  const { mutate: createMealMutation } = useAddMeal({
    onSuccess: () => {
      console.log('meals created successfully.');
      refetch();
      setIsOpen(false);
      reset({});
      setAiSuggestion(null);
      setCurrentTab(TabsKeys.manual);
    },
  });

  const createMeal = (data: TCreateMealFormData) => {
    createMealMutation({ ...data, date: format(new Date(), 'yyyy-MM-dd') });
  };

  const aiSuggestionAgree = () => {
    if (aiSuggestion) {
      createMeal(aiSuggestion);
    }
  };

  const correctAiSuggestion = () => {
    if (aiSuggestion) {
      setCurrentTab(TabsKeys.manual);
      reset(aiSuggestion);
      setAiSuggestion(null);
    }
  };

  const onModalClose = (e: any) => {
    setCurrentTab(TabsKeys.manual);
    onCancel?.(e);
    reset({});
  };

  const tabs = useMemo((): TabsProps['items'] => {
    return [
      {
        key: 'manual',
        label: 'Ручной ввод',
        children: (
          <ManualAddMealForm
            control={control}
            onSubmit={handleSubmit(createMeal)}
          />
        ),
      },
      {
        key: 'text',
        label: 'Текстовое опредение',
        children: <TextAiAddMealForm setAiSuggestion={setAiSuggestion} />,
      },
      {
        key: 'photo',
        label: 'Определение по фото',
        children: <PhotoAiAddMealForm setAiSuggestion={setAiSuggestion} />,
      },
    ];
  }, [setAiSuggestion]);

  return (
    <UiModal
      {...props}
      destroyOnHidden
      centered
      title="Добавить прием пищи"
      footer={null}
      onCancel={onModalClose}
    >
      <UiTabs
        activeKey={currentTab}
        onChange={(key) => setCurrentTab(key as TabsKeys)}
        items={tabs}
      />

      {aiSuggestion && (
        <>
          <div className={styles.suggestions}>
            {Object.entries(aiSuggestion).map(([key, value]) => (
              <div key={value}>
                <div className={styles.suggestionsTitle}>
                  {NUTRITION_DICTIONARY[key as NutritionType]}
                </div>
                <>{value}</>
              </div>
            ))}
          </div>
          <div className={styles.buttonsWrapper}>
            <UiButton onClick={correctAiSuggestion}>Скоррекировать</UiButton>
            <UiButton onClick={aiSuggestionAgree}>
              Сохранить прием пищи
            </UiButton>
          </div>
        </>
      )}
    </UiModal>
  );
};

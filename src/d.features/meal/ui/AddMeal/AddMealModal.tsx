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
import { UiButton, UiCard, UiFlex, UiModal, UiTypography } from '@/f.shared/ui';
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

  const aiSuggestionCancel = () => {
    setAiSuggestion(null);
  };

  const correctAiSuggestion = () => {
    if (aiSuggestion) {
      setCurrentTab(TabsKeys.manual);
      reset(aiSuggestion);
      setAiSuggestion(null);
    }
  };

  const onModalClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentTab(TabsKeys.manual);
    onCancel?.(e);
    reset({});
  };

  const tabs = useMemo((): TabsProps['items'] => {
    return [
      {
        key: TabsKeys.manual,
        label: 'Ручной ввод',
        children: (
          <ManualAddMealForm
            control={control}
            onSubmit={handleSubmit(createMeal)}
          />
        ),
      },
      {
        key: TabsKeys.text,
        label: 'Текстовый ввод',
        children: (
          <TextAiAddMealForm
            aiSuggestion={aiSuggestion}
            setAiSuggestion={setAiSuggestion}
          />
        ),
      },
      {
        key: TabsKeys.photo,
        label: 'По фото',
        children: (
          <PhotoAiAddMealForm
            aiSuggestion={aiSuggestion}
            setAiSuggestion={setAiSuggestion}
          />
        ),
      },
    ];
  }, [aiSuggestion, setAiSuggestion]);

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
        <UiFlex direction="column" gap="s">
          <UiCard inverse className={styles.suggestions}>
            <div className={styles.suggestionsName}>
              <UiTypography>{aiSuggestion.name}</UiTypography>
            </div>
            {Object.entries(aiSuggestion).map(([key, value]) =>
              key === 'name' ? null : (
                <UiCard key={value}>
                  <UiTypography size="small" type="label">
                    {NUTRITION_DICTIONARY[key as NutritionType]}
                  </UiTypography>
                  <UiTypography>{value}</UiTypography>
                </UiCard>
              ),
            )}
          </UiCard>
          <div className={styles.buttonsWrapper}>
            <UiButton onClick={correctAiSuggestion}>Скоррекировать</UiButton>
            <UiButton onClick={aiSuggestionAgree}>Сохранить</UiButton>
            <UiButton styleType="secondary" onClick={aiSuggestionCancel}>
              Отменить
            </UiButton>
          </div>
        </UiFlex>
      )}
    </UiModal>
  );
};

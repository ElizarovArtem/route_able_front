import { type ModalProps, Spin } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { UploadFile } from 'antd/lib';
import type { DefaultOptionType } from 'rc-select/lib/Select';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAnalyzeBodyFatByPhoto } from '@/d.features/user/api/queries/useAnalyzeBodyFatByPhoto.ts';
import { useUpdateUserFatGoals } from '@/d.features/user/api/queries/useMakeTDEEAnalyze.ts';
import { userSelector } from '@/e.entities/user';
import {
  type UserMakeTDEEAnalyzeFormData,
  userMakeTDEEAnalyzeResolver,
} from '@/e.entities/user/model/resolvers/user.make-tdee-analyze-resolver.ts';
import {
  ACTIVITY_OPTIONS,
  GOAl_OPTIONS,
} from '@/e.entities/user/model/user.constants.tsx';
import { Gender } from '@/e.entities/user/model/user.enums.ts';
import { useSelector } from '@/f.shared/lib';
import { formatDateForServer } from '@/f.shared/lib/formatDateForServer.ts';
import {
  FormDatepicker,
  FormInput,
  FormSelect,
  UiButton,
  UiFlex,
  UiModal,
  UiModalActions,
  UiTypography,
  UiUpload,
} from '@/f.shared/ui';

import styles from './CalculateTDEEModal.module.scss';

type CalculateTDEEModalProps = {
  onClose: () => void;
} & ModalProps;

const GENDER_OPTIONS: DefaultOptionType[] = [
  { value: Gender.Male, label: 'Мужской' },
  { value: Gender.Female, label: 'Женский' },
];

export const CalculateTDEEModal = ({
  onClose,
  ...props
}: CalculateTDEEModalProps) => {
  const [calculateFatByPhotoOpen, setCalculateFatByPhotoOpen] = useState(false);

  const { getUser, user } = useSelector(userSelector);

  const { control, handleSubmit, setValue, reset } =
    useForm<UserMakeTDEEAnalyzeFormData>({
      resolver: userMakeTDEEAnalyzeResolver,
    });

  const { isPending: isCalculating, mutate: makeTDEEAnalyzeMutation } =
    useUpdateUserFatGoals({
      onSuccess: () => {
        if (user) {
          getUser(user.id);
          onClose();
        }
      },
    });

  const { mutate: analyzeBodyFatMutation, isPending } =
    useAnalyzeBodyFatByPhoto({
      onSuccess: (data) => {
        setValue('bodyFatPercent', data);
      },
    });

  const onPhotoUploadSuccess = ({
    fileList,
  }: UploadChangeParam<UploadFile>) => {
    const formData = new FormData();

    formData.append('photo', fileList[0].originFileObj as File);

    analyzeBodyFatMutation(formData);
  };

  const onFormSubmit = (data: UserMakeTDEEAnalyzeFormData) => {
    makeTDEEAnalyzeMutation({
      ...data,
      birthDate: formatDateForServer(data.birthDate),
    });
  };

  useEffect(() => {
    reset({
      bodyFatPercent: user?.bodyFatPercent || undefined,
      activityLevel: user?.activityLevel || undefined,
      birthDate: new Date(user?.birthDate || ''),
      gender: user?.gender || undefined,
      height: user?.height || undefined,
      weight: user?.weight || undefined,
      weightGoal: user?.weightGoal || undefined,
    });
  }, [user]);

  return (
    <UiModal
      {...props}
      title="Расчёт дневной нормы"
      description="Уточните параметры — мы рассчитаем расход калорий и персональные цели КБЖУ."
      size="large"
      onCancel={onClose}
    >
      <UiFlex direction="column" gap="s">
        <UiTypography type="secondary" size="small">
          TDEE — примерное количество энергии, которое организм расходует за
          сутки с учётом повседневной активности и тренировок.
        </UiTypography>
        <form
          onSubmit={handleSubmit(onFormSubmit, (errors) => {
            console.log(errors);
          })}
        >
          <UiFlex direction="column" gap="s">
            <UiFlex
              className={styles.fieldsRow}
              gap="s"
              childrenEqualLength
              wrap="wrap"
            >
              <FormSelect
                name="gender"
                control={control}
                placeholder="Пол"
                label="Пол"
                options={GENDER_OPTIONS}
              />
              <FormInput
                name="height"
                control={control}
                placeholder="Например, 178"
                label="Рост, см"
                type="number"
              />
              <FormInput
                name="weight"
                control={control}
                placeholder="Например, 72"
                label="Вес, кг"
                type="number"
              />
            </UiFlex>

            <UiFlex
              className={styles.fieldsRow}
              gap="s"
              childrenEqualLength
              wrap="wrap"
            >
              <FormDatepicker
                name="birthDate"
                control={control}
                placeholder="Дата рождения"
                label="Дата рождения"
              />
              <FormSelect
                name="activityLevel"
                control={control}
                placeholder="Активность"
                label="Уровень активности"
                options={ACTIVITY_OPTIONS}
              />
              <FormSelect
                name="weightGoal"
                control={control}
                placeholder="Цель"
                label="Ваша цель"
                options={GOAl_OPTIONS}
              />
            </UiFlex>

            <UiFlex className={styles.fatField} align="end" gap="s" wrap="wrap">
              <FormInput
                name="bodyFatPercent"
                control={control}
                placeholder="Например, 18"
                label="Процент жира"
                type="number"
              />
              <UiButton
                styleType="secondary"
                size="middle"
                className={styles.detectFatByPhotoLabel}
                onClick={() =>
                  setCalculateFatByPhotoOpen((prevState) => !prevState)
                }
              >
                {calculateFatByPhotoOpen
                  ? 'Скрыть загрузку фото'
                  : 'Не знаю — определить по фото'}
              </UiButton>
            </UiFlex>
            {calculateFatByPhotoOpen && (
              <UiFlex className={styles.photoPanel} direction="column" gap="s">
                <UiTypography type="secondary" size="small">
                  Оценка по фото ориентировочная, возможна погрешность до ±6%.
                  Для точного результата используйте DEXA, BIA или калипер.
                </UiTypography>
                <UiUpload onChange={onPhotoUploadSuccess}>
                  {isPending ? (
                    <Spin />
                  ) : (
                    <UiButton styleType="secondary">Загрузить фото</UiButton>
                  )}
                </UiUpload>
              </UiFlex>
            )}
            <UiModalActions>
              <UiButton
                styleType="secondary"
                onClick={onClose}
                disabled={isCalculating}
              >
                Отмена
              </UiButton>
              <UiButton htmlType="submit" loading={isCalculating}>
                Рассчитать
              </UiButton>
            </UiModalActions>
          </UiFlex>
        </form>
      </UiFlex>
    </UiModal>
  );
};

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

  const { mutate: makeTDEEAnalyzeMutation } = useUpdateUserFatGoals({
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
    <UiModal {...props} title="Расчет TDEE">
      <UiFlex direction="column" gap="s">
        <UiTypography>
          TDEE (Total Daily Energy Expenditure) — это общий суточный расход
          энергии, то есть общее количество калорий, которое ваш организм
          сжигает за день, включая базовый метаболизм, переваривание пищи и
          любую физическую активность, от тренировок до повседневных движений, и
          он нужен, чтобы понимать, сколько калорий потреблять для поддержания,
          набора или снижения веса.
        </UiTypography>
        <form
          onSubmit={handleSubmit(onFormSubmit, (errors) => {
            console.log(errors);
          })}
        >
          <UiFlex direction="column">
            <UiFlex gap="s" childrenEqualLength>
              <FormSelect
                name="gender"
                control={control}
                placeholder="Пол"
                options={GENDER_OPTIONS}
              />
              <FormInput
                name="height"
                control={control}
                placeholder="Рост"
                type="number"
              />
              <FormInput
                name="weight"
                control={control}
                placeholder="Вес"
                type="number"
              />
            </UiFlex>

            <UiFlex gap="s" childrenEqualLength>
              <FormDatepicker
                name="birthDate"
                control={control}
                placeholder="Дата рождения"
              />
              <FormSelect
                name="activityLevel"
                control={control}
                placeholder="Активность"
                options={ACTIVITY_OPTIONS}
              />
              <FormSelect
                name="weightGoal"
                control={control}
                placeholder="Цель"
                options={GOAl_OPTIONS}
              />
            </UiFlex>

            <UiFlex align="center">
              <FormInput
                name="bodyFatPercent"
                control={control}
                placeholder="Процент жира"
              />
              <UiTypography
                size="small"
                className={styles.detectFatByPhotoLabel}
                onClick={() =>
                  setCalculateFatByPhotoOpen((prevState) => !prevState)
                }
              >
                {calculateFatByPhotoOpen
                  ? 'Скрыть'
                  : 'Не заню, определить по фото'}
              </UiTypography>
            </UiFlex>
            {calculateFatByPhotoOpen && (
              <UiFlex direction="column">
                <UiTypography>
                  <UiTypography>
                    <b>Внимание:</b> эта оценка по фото может быть неточной
                    (погрешность до ±6%). Используйте её только как ориентир.
                    Для точного % жира рекомендуем: DEXA-скан, BIA-анализ (в
                    спортзале/клинике), Skinfold-калипер
                  </UiTypography>
                </UiTypography>
                <UiUpload onChange={onPhotoUploadSuccess}>
                  {isPending ? <Spin /> : <UiButton>Загрузить фото</UiButton>}
                </UiUpload>
              </UiFlex>
            )}
            <UiFlex justify="end">
              <UiButton htmlType="submit">Расчитать</UiButton>
            </UiFlex>
          </UiFlex>
        </form>
      </UiFlex>
    </UiModal>
  );
};

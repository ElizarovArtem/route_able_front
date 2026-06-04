import { type ModalProps } from 'antd';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useUpdateUser } from '@/d.features/user/api/queries/useUpdateUser.ts';
import { type User, userSelector } from '@/e.entities/user';
import {
  type TUpdateUserFormData,
  updateUserFormResolver,
} from '@/e.entities/user/model/resolvers/user.update-user-resolver.ts';
import {
  ACTIVITY_OPTIONS,
  GOAl_OPTIONS,
} from '@/e.entities/user/model/user.constants.tsx';
import { useSelector } from '@/f.shared/lib';
import { useMobile } from '@/f.shared/lib/useMobile.ts';
import {
  FormInput,
  FormSelect,
  FormTextarea,
  FormUpload,
  UiAvatar,
  UiButton,
  UiFlex,
  UiModal,
  UiTypography,
} from '@/f.shared/ui';

import styles from './UpdateUserModal.module.scss';

type TUpdateUserModalProps = {
  setOpenModal: (isOpen: boolean) => void;
} & ModalProps;

export const UpdateUserModal = ({
  setOpenModal,
  ...props
}: TUpdateUserModalProps) => {
  const { control, reset, handleSubmit } = useForm<TUpdateUserFormData>({
    defaultValues: {},
    resolver: updateUserFormResolver,
  });
  const { setUser, user } = useSelector(userSelector);

  const isMobile = useMobile();

  const { mutate } = useUpdateUser({
    onSuccess: (data: User) => {
      setUser(data);
      setOpenModal(false);
    },
  });

  const beforeUpload = (file: File) => {
    return new Promise<boolean>((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const { width, height } = img;

        if (width > 512 || height > 512) {
          resolve(false);
        } else {
          resolve(true);
        }
      };
    });
  };

  const updateUser = (data: TUpdateUserFormData) => {
    const formData = new FormData();

    formData.append('avatar', data.avatar as File);
    formData.append('name', data.name || '');
    formData.append('email', data.email || '');
    formData.append('phone', data.phone || '');
    formData.append('about', data.about || '');
    formData.append('weight', data.weight || '');
    formData.append('height', data.height || '');
    formData.append('activityLevel', data.activityLevel || '');
    formData.append('weightGoal', data.weightGoal || '');

    mutate(formData);
  };

  useEffect(() => {
    if (user) {
      reset({
        about: user.about || '',
        email: user.email || '',
        name: user.name || '',
        phone: user.phone || '',
        weight: user.weight?.toString() || '',
        height: user.height?.toString() || '',
        activityLevel: user.activityLevel || '',
        weightGoal: user.weightGoal || '',
      });
    }
  }, [user]);

  return (
    <UiModal title="Обновить информацию о пользователе" centered {...props}>
      <form
        onSubmit={handleSubmit(updateUser, (errors) => {
          console.log(errors);
        })}
        className={styles.form}
      >
        <UiFlex gap={isMobile ? 'xs' : 's'} align="center">
          <UiAvatar height={150} src={user?.avatar} />
          <FormUpload
            name="avatar"
            control={control}
            customRequest={() => {}}
            beforeUpload={beforeUpload}
          >
            <UiButton>Загрузить фото</UiButton>
          </FormUpload>
        </UiFlex>

        <UiTypography bold>Личная информация</UiTypography>
        <UiFlex
          direction={isMobile ? 'column' : 'row'}
          gap={isMobile ? 'xs' : 's'}
        >
          <FormInput
            label="Имя"
            name="name"
            control={control}
            placeholder="Имя"
          />
          <FormInput
            label="Рост"
            type="number"
            name="height"
            control={control}
            placeholder="Рост"
          />
          <FormInput
            label="Вес"
            type="number"
            name="weight"
            control={control}
            placeholder="Вес"
          />
        </UiFlex>

        <FormTextarea
          disableResize
          name="about"
          control={control}
          placeholder="О себе"
        />

        <UiTypography bold>Контактная информация</UiTypography>
        <UiFlex
          childrenEqualLength
          direction={isMobile ? 'column' : 'row'}
          gap={isMobile ? 'xs' : 's'}
        >
          <FormInput
            label="Номер телефона"
            name="phone"
            control={control}
            placeholder="Номер телефона"
          />
          <FormInput
            label="Email"
            name="email"
            control={control}
            placeholder="Email"
          />
        </UiFlex>

        <UiTypography bold>Тренировочная информация</UiTypography>
        <UiFlex
          childrenEqualLength
          direction={isMobile ? 'column' : 'row'}
          gap={isMobile ? 'xs' : 's'}
        >
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

        <UiButton htmlType="submit">Обновить</UiButton>
      </form>
    </UiModal>
  );
};

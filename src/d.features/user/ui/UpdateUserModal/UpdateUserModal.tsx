import { type ModalProps } from 'antd';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useUpdateUser } from '@/d.features/user/api/queries/useUpdateUser.ts';
import {
  type TUpdateUserFormData,
  updateUserFormResolver,
} from '@/d.features/user/model/user.update-user-resolver.ts';
import { Roles, type User, userSelector } from '@/e.entities/user';
import { useSelector } from '@/f.shared/lib';
import { FormInput, UiButton, UiModal } from '@/f.shared/ui';
import { FormCheckbox } from '@/f.shared/ui/UiCheckbox/UiCheckbox.tsx';
import { FormTextarea } from '@/f.shared/ui/UiTextarea/UiTextarea.tsx';
import { FormUpload } from '@/f.shared/ui/UiUpload/UiUpload.tsx';

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

  const { mutate } = useUpdateUser({
    onSuccess: (data: User) => {
      setUser(data);
      setOpenModal(false);
    },
  });

  const updateUser = (data: TUpdateUserFormData) => {
    const formData = new FormData();

    formData.append('avatar', data.avatar as File);
    formData.append('name', data.name || '');
    formData.append('email', data.email || '');
    formData.append('phone', data.phone || '');
    formData.append('about', data.about || '');
    formData.append('isCoach', JSON.stringify(data.isCoach));

    mutate(data);
  };

  useEffect(() => {
    if (user) {
      reset({
        about: user.about || '',
        email: user.email || '',
        name: user.name || '',
        phone: user.phone || '',
        isCoach: user.roles.includes(Roles.Coach),
      });
    }
  }, [user]);

  return (
    <UiModal
      title="Обновить информацию о пользователе"
      centered
      footer={null}
      {...props}
    >
      <form
        onSubmit={handleSubmit(updateUser, (errors) => {
          console.log(errors);
        })}
        className={styles.form}
      >
        <FormUpload name="avatar" control={control}>
          <UiButton>Загрузить фото</UiButton>
        </FormUpload>
        <FormInput name="name" control={control} placeholder="Имя" />
        <FormInput
          name="phone"
          control={control}
          placeholder="Номер телефона"
        />
        <FormInput name="email" control={control} placeholder="Email" />
        <FormTextarea name="about" control={control} placeholder="О себе" />
        <FormCheckbox name="isCoach" control={control}>
          Я тренер
        </FormCheckbox>
        <UiButton htmlType="submit">Обновить</UiButton>
      </form>
    </UiModal>
  );
};

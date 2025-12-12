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
import { useMobile } from '@/f.shared/lib/useMobile.ts';
import {
  FormInput,
  UiButton,
  UiFlex,
  UiModal,
  UiTypography,
} from '@/f.shared/ui';
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
  const { control, reset, handleSubmit, watch } = useForm<TUpdateUserFormData>({
    defaultValues: {},
    resolver: updateUserFormResolver,
  });
  const { setUser, user } = useSelector(userSelector);

  const isMobile = useMobile();
  const isCoach = watch('isCoach');

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
    formData.append('isCoach', JSON.stringify(data.isCoach));

    mutate(formData);
  };

  useEffect(() => {
    if (user) {
      reset({
        about: user.about || '',
        email: user.email || '',
        name: user.name || '',
        phone: user.phone || '',
        weight: user.weight || '',
        height: user.height || '',
        isCoach: user.roles.includes(Roles.Coach),
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
        <FormUpload
          name="avatar"
          control={control}
          customRequest={() => {}}
          beforeUpload={beforeUpload}
        >
          <UiButton>Загрузить фото</UiButton>
        </FormUpload>
        <FormInput name="name" control={control} placeholder="Имя" />
        <UiFlex
          direction={isMobile ? 'column' : 'row'}
          gap={isMobile ? 's' : 'm'}
        >
          <FormInput
            type="number"
            name="height"
            control={control}
            placeholder="Рост"
          />
          <FormInput
            type="number"
            name="weight"
            control={control}
            placeholder="Вес"
          />
        </UiFlex>
        <FormInput
          name="phone"
          control={control}
          placeholder="Номер телефона"
        />
        <FormInput name="email" control={control} placeholder="Email" />
        <FormTextarea
          disableResize
          name="about"
          control={control}
          placeholder="О себе"
        />
        <FormCheckbox name="isCoach" control={control}>
          Я тренер
        </FormCheckbox>
        {isCoach && !user?.isCoachAgreed && (
          <UiTypography size="small">
            Мы свяжемся с вами по указанным выше контактам для подтверждения
            вашего опыта
          </UiTypography>
        )}
        <UiButton htmlType="submit">Обновить</UiButton>
      </form>
    </UiModal>
  );
};

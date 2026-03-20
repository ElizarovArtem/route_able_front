import type { ModalProps } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useCreateCoachOffer } from '@/d.features/coachBilling/api/queries/useCreateCoachOffer.ts';
import { createCoachOfferFormResolver } from '@/e.entities/coachBilling/model/resolvers/create-coach-offer.resolver.ts';
import {
  FormInput,
  FormTextarea,
  UiButton,
  UiFlex,
  UiModal,
} from '@/f.shared/ui';

type CreateCoachOfferModalProps = {
  onClose: () => void;
  refetchOffers: () => void;
} & ModalProps;

export const CreateCoachOfferModal = ({
  refetchOffers,
  onClose,
  ...props
}: CreateCoachOfferModalProps) => {
  const { mutate: createOfferMutation } = useCreateCoachOffer({
    onSuccess: () => {
      refetchOffers();
      onClose();
    },
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      currency: 'Рубли',
    },
    resolver: createCoachOfferFormResolver,
  });

  const onCreateOffer = () => {
    handleSubmit((data) => {
      createOfferMutation(data);
    })();
  };

  return (
    <UiModal title="Добавить услугу" {...props}>
      <UiFlex direction="column" gap="s">
        <UiFlex childrenEqualLength>
          <FormInput name="title" control={control} label="Название" />
          <FormInput
            name="sessionCount"
            type="number"
            control={control}
            label="Количество занятий"
          />
        </UiFlex>
        <FormTextarea name="description" control={control} label="Описание" />
        <UiFlex childrenEqualLength>
          <FormInput name="price" control={control} label="Цена" />
          <FormInput name="currency" control={control} label="Валюта" />
        </UiFlex>
        <UiFlex justify="center">
          <UiButton onClick={onCreateOffer}>Добавить</UiButton>
        </UiFlex>
      </UiFlex>
    </UiModal>
  );
};

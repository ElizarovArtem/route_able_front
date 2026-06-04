import type { ModalProps } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useCreateFeedback } from '@/d.features/feedback/api/queries/useCreateFeedback.ts';
import { FeedbackType } from '@/e.entities/feedback/model/feedback.constants.ts';
import { feedbackSelector } from '@/e.entities/feedback/model/feedback.store.ts';
import {
  createFeedbackFormResolver,
  type TCreateFeedbackFormData,
} from '@/e.entities/feedback/model/resolvers/feedback.create-feedback-resolver.ts';
import { useSelector } from '@/f.shared/lib';
import {
  FormInput,
  FormSelect,
  FormTextarea,
  UiButton,
  UiFlex,
  UiModal,
} from '@/f.shared/ui';

export const feedbackTypeOptions = [
  { label: 'Ошибка', value: FeedbackType.BUG },
  { label: 'Идея', value: FeedbackType.IDEA },
  { label: 'Жалоба', value: FeedbackType.COMPLAINT },
  { label: 'Комплимент', value: FeedbackType.PRAISE },
  { label: 'Другое', value: FeedbackType.OTHER },
];

type FeedbackModalProps = {} & ModalProps;

export const CreateFeedbackModal = ({ ...props }: FeedbackModalProps) => {
  const { isFeedbackModalOpen, setIsFeedbackModalOpen } =
    useSelector(feedbackSelector);

  const { control, handleSubmit } = useForm<TCreateFeedbackFormData>({
    resolver: createFeedbackFormResolver,
  });

  const { mutate: createFeedbackMutation } = useCreateFeedback({
    onSuccess: () => {
      setIsFeedbackModalOpen(false);
    },
  });

  const onCreateFeedbackClick = () => {
    handleSubmit((data) => {
      createFeedbackMutation(data);
    })();
  };

  return (
    <UiModal
      title="Оставить отзыв или пожелание"
      open={isFeedbackModalOpen}
      onCancel={() => setIsFeedbackModalOpen(false)}
      {...props}
    >
      <UiFlex direction="column" gap="s">
        <UiFlex childrenEqualLength gap="s" align="end">
          <FormInput label="Имя" name="name" control={control} />
          <FormInput label="Контакт" name="contact" control={control} />
          <FormSelect
            label="Тип отзыва"
            name="type"
            options={feedbackTypeOptions}
            control={control}
          />
        </UiFlex>
        <FormTextarea
          disableResize
          label="Отзыв"
          name="message"
          control={control}
          rows={4}
        />
        <UiFlex justify="end">
          <UiButton onClick={onCreateFeedbackClick}>Отправить</UiButton>
        </UiFlex>
      </UiFlex>
    </UiModal>
  );
};

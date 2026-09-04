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
  UiModalActions,
  UiTypography,
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

  const { control, handleSubmit, reset } = useForm<TCreateFeedbackFormData>({
    resolver: createFeedbackFormResolver,
  });

  const { isPending, mutate: createFeedbackMutation } = useCreateFeedback({
    onSuccess: () => {
      reset();
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
      description="Расскажите, что понравилось или что можно улучшить. Мы читаем каждое сообщение."
      open={isFeedbackModalOpen}
      onCancel={() => setIsFeedbackModalOpen(false)}
      size="medium"
      {...props}
    >
      <UiFlex direction="column" gap="s">
        <FormSelect
          label="Тема сообщения"
          name="type"
          options={feedbackTypeOptions}
          control={control}
        />
        <FormTextarea
          disableResize
          label="Сообщение"
          name="message"
          control={control}
          rows={5}
          placeholder="Опишите вашу идею или проблему подробнее"
        />
        <UiFlex childrenEqualLength gap="s" align="end" wrap="wrap">
          <FormInput label="Имя" name="name" control={control} />
          <FormInput
            label="Контакт для ответа"
            name="contact"
            control={control}
            placeholder="Email или Telegram"
          />
        </UiFlex>
        <UiTypography size="small" type="secondary">
          Контакт нужен только в том случае, если потребуется уточнить детали.
        </UiTypography>
      </UiFlex>
      <UiModalActions>
        <UiButton
          styleType="secondary"
          onClick={() => setIsFeedbackModalOpen(false)}
          disabled={isPending}
        >
          Отмена
        </UiButton>
        <UiButton loading={isPending} onClick={onCreateFeedbackClick}>
          Отправить
        </UiButton>
      </UiModalActions>
    </UiModal>
  );
};

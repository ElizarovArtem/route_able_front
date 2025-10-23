import { zodResolver } from '@hookform/resolvers/zod';
import { addMinutes, setMilliseconds, setSeconds } from 'date-fns';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateVideoLesson } from '@/d.features/video/api';
import { UiButton, UiModal } from '@/f.shared/ui';
import { FormDatepicker } from '@/f.shared/ui/UiDatepicker/UiDatepicker.tsx';
import { FormInput } from '@/f.shared/ui/UiInput/UiInput.tsx';
import { FormTextarea } from '@/f.shared/ui/UiTextarea/UiTextarea.tsx';

import styles from './CreateVideoLessonModal.module.scss';

const DATE_FORMAT = 'dd.MM.yyyy HH:mm';

const createVideoLessonSchema = z
  .object({
    title: z
      .string()
      .max(120, 'Название не должно превышать 120 символов')
      .optional(),
    notes: z
      .string()
      .max(500, 'Описание не должно превышать 500 символов')
      .optional(),
    startAt: z
      .date({
        required_error: 'Укажите время начала',
        invalid_type_error: 'Укажите время начала',
      })
      .refine((value) => !Number.isNaN(value.getTime()), 'Неверная дата'),
    endAt: z
      .date({
        required_error: 'Укажите время окончания',
        invalid_type_error: 'Укажите время окончания',
      })
      .refine((value) => !Number.isNaN(value.getTime()), 'Неверная дата'),
  })
  .refine((data) => data.endAt > data.startAt, {
    path: ['endAt'],
    message: 'Окончание должно быть позже начала',
  });

type CreateVideoLessonFormValues = z.infer<typeof createVideoLessonSchema>;

type CreateVideoLessonModalProps = {
  relationId: string;
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
};

const getInitialFormValues = (): CreateVideoLessonFormValues => {
  const now = new Date();
  const startBase = addMinutes(now, 30);
  const normalizedStart = setMilliseconds(setSeconds(startBase, 0), 0);
  const endBase = addMinutes(normalizedStart, 45);
  const normalizedEnd = setMilliseconds(setSeconds(endBase, 0), 0);

  return {
    title: '',
    notes: '',
    startAt: normalizedStart,
    endAt: normalizedEnd,
  };
};

export const CreateVideoLessonModal = ({
  relationId,
  open,
  onClose,
  onCreated,
}: CreateVideoLessonModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateVideoLessonFormValues>({
    resolver: zodResolver(createVideoLessonSchema),
    defaultValues: getInitialFormValues(),
  });

  useEffect(() => {
    if (open) {
      reset(getInitialFormValues());
    }
  }, [open, reset]);

  const { mutate, isPending } = useCreateVideoLesson({
    onSuccess: () => {
      onCreated?.();
      onClose();
    },
  });

  const handleCreate = handleSubmit(({ startAt, endAt, title, notes }) => {
    mutate({
      relationId,
      startAt: startAt.toISOString(),
      endAt: endAt.toISOString(),
      title: title?.trim() || undefined,
      notes: notes?.trim() || undefined,
    });
  });

  return (
    <UiModal
      centered
      title="Запланировать видео-урок"
      footer={null}
      open={open}
      onCancel={onClose}
      destroyOnHidden
    >
      <form className={styles.form} onSubmit={handleCreate}>
        <FormInput
          name="title"
          control={control}
          placeholder="Название урока"
          maxLength={120}
        />

        <div className={styles.row}>
          <FormDatepicker
            name="startAt"
            control={control}
            placeholder="Дата и время начала"
            format={DATE_FORMAT}
            showTime={{ minuteStep: 5 }}
            allowClear={false}
          />
          <FormDatepicker
            name="endAt"
            control={control}
            placeholder="Дата и время окончания"
            format={DATE_FORMAT}
            showTime={{ minuteStep: 5 }}
            allowClear={false}
          />
        </div>

        <FormTextarea
          name="notes"
          control={control}
          placeholder="Комментарий для участника"
          autoSize={{ minRows: 3, maxRows: 5 }}
          maxLength={500}
        />

        <div className={styles.actions}>
          <UiButton htmlType="submit" loading={isSubmitting || isPending}>
            Запланировать
          </UiButton>
          <UiButton type="default" onClick={onClose}>
            Отмена
          </UiButton>
        </div>
      </form>
    </UiModal>
  );
};

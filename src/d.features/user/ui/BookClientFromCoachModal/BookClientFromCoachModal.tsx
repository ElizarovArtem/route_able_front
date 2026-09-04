import { useQueryClient } from '@tanstack/react-query';
import type { ModalProps } from 'antd';
import type { DefaultOptionType } from 'rc-select/lib/Select';
import React, { useMemo, useState } from 'react';

import { useCoachBookSlot, useDeleteTimeSlot } from '@/d.features/lessons';
import { Roles, useGetConnections } from '@/e.entities/user';
import {
  UiButton,
  UiFlex,
  UiModal,
  UiModalActions,
  UiSelector,
  UiTypography,
} from '@/f.shared/ui';

type BookClientFromCoachModalProps = {
  slotId: string | null;
  setOpen: (open: string | null) => void;
  selectedDate: string;
} & ModalProps;

export const BookClientFromCoachModal = ({
  slotId,
  setOpen,
  selectedDate,
  onCancel,
  ...props
}: BookClientFromCoachModalProps) => {
  const [clientId, setClientId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data: connections } = useGetConnections();
  const { isPending: isBooking, mutate: bookClientMutate } = useCoachBookSlot({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['coach-video-lesson', selectedDate],
      });
      setOpen(null);
    },
  });
  const { isPending: isDeleting, mutate: deleteMutate } = useDeleteTimeSlot({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['coach-slots', selectedDate],
      });
      setOpen(null);
    },
  });

  const clientsOptions = useMemo(() => {
    return (connections || []).reduce((acc: DefaultOptionType[], item) => {
      if (item.partnerRole === Roles.Client)
        acc.push({ label: item.partner.name, value: item.partner.id });

      return acc;
    }, []);
  }, [connections]);

  const onSlotBook = () => {
    if (clientId && slotId) {
      bookClientMutate({
        slotId: slotId,
        clientId: clientId,
      });
    }
  };

  const onSlotDelete = () => {
    if (slotId) {
      deleteMutate({
        slotId: slotId,
      });
    }
  };

  return (
    <UiModal
      {...props}
      open={!!slotId}
      title="Забронировать для клиента"
      description="Назначьте свободное время одному из ваших клиентов или удалите слот из расписания."
      onCancel={onCancel}
      size="small"
    >
      <UiFlex direction="column" gap="s">
        <UiSelector
          label="Клиент"
          options={clientsOptions}
          onChange={setClientId}
          placeholder="Выберите клиента"
        />
        {!clientsOptions.length && (
          <UiTypography type="secondary" size="small">
            В списке пока нет подключённых клиентов.
          </UiTypography>
        )}
      </UiFlex>
      <UiModalActions>
        <UiButton
          styleType="danger"
          loading={isDeleting}
          disabled={isBooking}
          onClick={onSlotDelete}
        >
          Удалить слот
        </UiButton>
        <UiButton
          loading={isBooking}
          disabled={!clientId || isDeleting}
          onClick={onSlotBook}
        >
          Забронировать
        </UiButton>
      </UiModalActions>
    </UiModal>
  );
};

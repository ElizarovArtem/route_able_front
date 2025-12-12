import { useQueryClient } from '@tanstack/react-query';
import type { ModalProps } from 'antd';
import type { DefaultOptionType } from 'rc-select/lib/Select';
import React, { useMemo, useState } from 'react';

import { useCoachBookSlot, useDeleteTimeSlot } from '@/d.features/lessons';
import { Roles, useGetConnections } from '@/e.entities/user';
import { UiButton, UiFlex, UiModal, UiSelector } from '@/f.shared/ui';

type BookClientFromCoachModalProps = {
  slotId: string | null;
  setOpen: (open: string | null) => void;
  selectedDate: string;
} & ModalProps;

export const BookClientFromCoachModal = ({
  slotId,
  setOpen,
  selectedDate,
  ...props
}: BookClientFromCoachModalProps) => {
  const [clientId, setClientId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data: connections } = useGetConnections();
  const { mutate: bookClientMutate } = useCoachBookSlot({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['coach-video-lesson', selectedDate],
      });
      setOpen(null);
    },
  });
  const { mutate: deleteMutate } = useDeleteTimeSlot({
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
      centered
      open={!!slotId}
      title="Забронировать для клиента"
    >
      <UiFlex direction="column">
        <UiSelector
          options={clientsOptions}
          onChange={setClientId}
          placeholder="Выберите клиента"
        />
        <UiFlex justify="end">
          <UiButton onClick={onSlotBook}>Забронировать</UiButton>
          <UiButton styleType="danger" onClick={onSlotDelete}>
            Удалить
          </UiButton>
        </UiFlex>
      </UiFlex>
    </UiModal>
  );
};

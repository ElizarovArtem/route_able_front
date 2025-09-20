import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { usePaySubscription } from '@/d.features/user/api';
import { UiButton } from '@/f.shared/ui';

type PaySubscriptionProps = {
  linkId: string;
  partnerId: string;
};

export const PaySubscription = ({
  linkId,
  partnerId,
}: PaySubscriptionProps) => {
  const client = useQueryClient();

  const { mutate } = usePaySubscription({
    onSuccess: () => {
      client.refetchQueries({ queryKey: ['relation', 'with', partnerId] });
    },
  });

  const paySubscription = () => {
    mutate(linkId);
  };

  return <UiButton onClick={paySubscription}>Оплатить</UiButton>;
};

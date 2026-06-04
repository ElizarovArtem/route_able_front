import { type CheckboxChangeEvent, type ModalProps, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

import { useCreateSubscriptionCheckout } from '@/d.features/subscriptions';
import { useGetSubscriptionPaymentStatus } from '@/e.entities/subscriptions';
import {
  SubscriptionPaymentStatus,
  SubscriptionPeriod,
} from '@/e.entities/subscriptions/model/subscriptions.constants.ts';
import type { PaidPlan } from '@/e.entities/subscriptions/model/subscriptions.types.ts';
import { UiButton, UiFlex, UiModal, UiTypography } from '@/f.shared/ui';
import { UiCheckbox } from '@/f.shared/ui/UiCheckbox/UiCheckbox.tsx';

type SubscriptionModalProps = {
  onClose?: () => void;
  selectedPlan: PaidPlan | null;
} & ModalProps;

enum PAYMENT_TYPE {
  makePaymentCheckout = 'makePaymentCheckout',
  waitForSuccess = 'waitForSuccess',
  success = 'success',
}

export const SubscriptionModal = ({
  selectedPlan,
  onClose,
  ...props
}: SubscriptionModalProps) => {
  const [paymentType, setPaymentType] = useState<PAYMENT_TYPE>(
    PAYMENT_TYPE.makePaymentCheckout,
  );
  const [paymentIdForPooling, setPaymentIdForPooling] = useState<string | null>(
    null,
  );
  const [period, setPeriod] = useState<SubscriptionPeriod>(
    SubscriptionPeriod.MONTH,
  );

  const { mutate: checkoutMutation } = useCreateSubscriptionCheckout({
    onSuccess: (data) => {
      if (data.paymentUrl) {
        window.open(data.paymentUrl, '_blank');
        setPaymentType(PAYMENT_TYPE.waitForSuccess);
        setPaymentIdForPooling(data.paymentId);
      }
    },
  });

  const { data } = useGetSubscriptionPaymentStatus(paymentIdForPooling);

  const onCreateSubscriptionCheckout = async () => {
    if (selectedPlan) {
      checkoutMutation({
        planCode: selectedPlan.code,
        period,
      });
    }
  };

  const onPeriodChange = (
    e: CheckboxChangeEvent,
    value: SubscriptionPeriod,
  ) => {
    if (e.target.checked) {
      setPeriod(value);
    }
  };

  const onOkClick = () => {
    onClose?.();
    setPaymentType(PAYMENT_TYPE.makePaymentCheckout);
  };

  useEffect(() => {
    if (data?.paymentStatus === SubscriptionPaymentStatus.SUCCEEDED) {
      setPaymentType(PAYMENT_TYPE.success);
      setPaymentIdForPooling(null);
    }
  }, [data]);

  return (
    <UiModal title="Оформление подписки" open={!!selectedPlan} {...props}>
      {paymentType === PAYMENT_TYPE.makePaymentCheckout && (
        <UiFlex direction="column">
          <UiFlex>
            <UiCheckbox
              value={period === SubscriptionPeriod.MONTH}
              onChange={(e) => onPeriodChange(e, SubscriptionPeriod.MONTH)}
            >
              Месяц
            </UiCheckbox>
            <UiCheckbox
              value={period === SubscriptionPeriod.YEAR}
              onChange={(e) => onPeriodChange(e, SubscriptionPeriod.YEAR)}
            >
              Год
            </UiCheckbox>
          </UiFlex>

          <UiFlex justify="end">
            <UiButton onClick={onCreateSubscriptionCheckout}>
              Создать заказ
            </UiButton>
          </UiFlex>
        </UiFlex>
      )}
      {paymentType === PAYMENT_TYPE.waitForSuccess && (
        <UiFlex justify="center" align="center">
          <Spin />
        </UiFlex>
      )}
      {paymentType === PAYMENT_TYPE.success && (
        <UiFlex justify="center" align="center" direction="column">
          <UiTypography>Оплата прошла успешно</UiTypography>
          <UiButton onClick={onOkClick}>Ок</UiButton>
        </UiFlex>
      )}
    </UiModal>
  );
};

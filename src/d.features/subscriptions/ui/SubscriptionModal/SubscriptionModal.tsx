import { type ModalProps, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

import { useCreateSubscriptionCheckout } from '@/d.features/subscriptions';
import { useGetSubscriptionPaymentStatus } from '@/e.entities/subscriptions';
import {
  SubscriptionPaymentStatus,
  SubscriptionPeriod,
} from '@/e.entities/subscriptions/model/subscriptions.constants.ts';
import type { PaidPlan } from '@/e.entities/subscriptions/model/subscriptions.types.ts';
import {
  UiButton,
  UiCard,
  UiFlex,
  UiModal,
  UiModalActions,
  UiTypography,
} from '@/f.shared/ui';

import styles from './SubscriptionModal.module.scss';

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

  const { isPending, mutate: checkoutMutation } = useCreateSubscriptionCheckout(
    {
      onSuccess: (data) => {
        if (data.paymentUrl) {
          window.open(data.paymentUrl, '_blank');
          setPaymentType(PAYMENT_TYPE.waitForSuccess);
          setPaymentIdForPooling(data.paymentId);
        }
      },
    },
  );

  const { data } = useGetSubscriptionPaymentStatus(paymentIdForPooling);

  const onCreateSubscriptionCheckout = async () => {
    if (selectedPlan) {
      checkoutMutation({
        planCode: selectedPlan.code,
        period,
      });
    }
  };

  const onOkClick = () => {
    onClose?.();
    setPaymentType(PAYMENT_TYPE.makePaymentCheckout);
    setPaymentIdForPooling(null);
    setPeriod(SubscriptionPeriod.MONTH);
  };

  const selectedPrice =
    period === SubscriptionPeriod.MONTH
      ? selectedPlan?.priceMonth
      : selectedPlan?.priceYear;

  useEffect(() => {
    if (data?.paymentStatus === SubscriptionPaymentStatus.SUCCEEDED) {
      setPaymentType(PAYMENT_TYPE.success);
      setPaymentIdForPooling(null);
    }
  }, [data]);

  return (
    <UiModal
      title="Оформление подписки"
      description="Выберите период и проверьте стоимость перед переходом к оплате."
      open={!!selectedPlan}
      onCancel={onOkClick}
      size="medium"
      {...props}
    >
      {paymentType === PAYMENT_TYPE.makePaymentCheckout && (
        <UiFlex direction="column" gap="s">
          <UiCard tone="elevated">
            <UiFlex justify="space-between" align="center" gap="s">
              <UiFlex direction="column" gap="xxs">
                <UiTypography bold>{selectedPlan?.title}</UiTypography>
                <UiTypography type="secondary" size="small">
                  {selectedPlan?.description}
                </UiTypography>
              </UiFlex>
              <UiTypography bold size="large">
                {selectedPrice ?? 0} ₽
              </UiTypography>
            </UiFlex>
          </UiCard>
          <UiTypography type="label">Период оплаты</UiTypography>
          <UiFlex
            className={styles.periodSelector}
            gap="xs"
            childrenEqualLength
          >
            <UiButton
              styleType={
                period === SubscriptionPeriod.MONTH ? 'primary' : 'secondary'
              }
              onClick={() => setPeriod(SubscriptionPeriod.MONTH)}
            >
              Месяц
            </UiButton>
            <UiButton
              styleType={
                period === SubscriptionPeriod.YEAR ? 'primary' : 'secondary'
              }
              disabled={selectedPlan?.priceYear == null}
              onClick={() => setPeriod(SubscriptionPeriod.YEAR)}
            >
              Год
            </UiButton>
          </UiFlex>
          <UiModalActions>
            <UiButton styleType="secondary" onClick={onOkClick}>
              Отмена
            </UiButton>
            <UiButton
              loading={isPending}
              onClick={onCreateSubscriptionCheckout}
            >
              Перейти к оплате
            </UiButton>
          </UiModalActions>
        </UiFlex>
      )}
      {paymentType === PAYMENT_TYPE.waitForSuccess && (
        <UiFlex
          className={styles.status}
          justify="center"
          align="center"
          direction="column"
          gap="s"
        >
          <Spin />
          <UiTypography bold>Ожидаем подтверждение оплаты</UiTypography>
          <UiTypography type="secondary" size="small">
            Завершите оплату в открывшейся вкладке. Это окно обновится
            автоматически.
          </UiTypography>
        </UiFlex>
      )}
      {paymentType === PAYMENT_TYPE.success && (
        <UiFlex
          className={styles.status}
          justify="center"
          align="center"
          direction="column"
          gap="s"
        >
          <div className={styles.successIcon}>✓</div>
          <UiTypography bold size="large">
            Подписка активна
          </UiTypography>
          <UiTypography type="secondary">
            Оплата прошла успешно. Возможности тарифа уже доступны.
          </UiTypography>
          <UiButton onClick={onOkClick}>Готово</UiButton>
        </UiFlex>
      )}
    </UiModal>
  );
};

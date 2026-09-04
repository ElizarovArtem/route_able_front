import { type ModalProps, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

import { useCreateOrder } from '@/d.features/coachBilling/api/queries/useCreateOrder.ts';
import { useMakePayment } from '@/d.features/coachBilling/api/queries/useMakePayment.ts';
import { useGetOrderStatus } from '@/e.entities/coachBilling/api/queries/useGetOrderStatus.ts';
import { CoachOrderStatus } from '@/e.entities/coachBilling/model/coachBilling.constants.ts';
import type { CoachOffer } from '@/e.entities/coachBilling/model/coachBilling.model.ts';
import {
  UiButton,
  UiCard,
  UiFlex,
  UiModal,
  UiModalActions,
  UiTypography,
} from '@/f.shared/ui';

import styles from './PayForOfferModal.module.scss';

type PayForOfferModalProps = {
  onClose: () => void;
  offer: CoachOffer | null;
} & ModalProps;

enum PAYMENT_TYPE {
  makeOrder = 'makeOrder',
  makePayment = 'makePayment',
  waitForSuccess = 'waitForSuccess',
  success = 'success',
}

export const PayForOfferModal = ({
  offer,
  onClose,
  ...props
}: PayForOfferModalProps) => {
  const [paymentType, setPaymentType] = useState<PAYMENT_TYPE>(
    PAYMENT_TYPE.makeOrder,
  );
  const [orderId, setSOrderId] = useState<string | null>(null);
  const [orderIdForPooling, setSOrderIdForPooling] = useState<string | null>(
    null,
  );

  const { isPending: isCreatingOrder, mutate: createOderMutation } =
    useCreateOrder({
      onSuccess: (data) => {
        if (data.orderId) {
          setSOrderId(data.orderId);
          setPaymentType(PAYMENT_TYPE.makePayment);
        }
      },
    });

  const { isPending: isCreatingPayment, mutate: makePaymentMutation } =
    useMakePayment({
      onSuccess: (data) => {
        if (data.paymentUrl) {
          window.open(data.paymentUrl, '_blank');
          setPaymentType(PAYMENT_TYPE.waitForSuccess);
          setSOrderIdForPooling(orderId as string);
        }
      },
    });

  const { data } = useGetOrderStatus(orderIdForPooling);

  const onOrderCreate = () => {
    if (offer) {
      createOderMutation({
        offerId: offer?.id,
      });
    }
  };

  const onMakePayment = () => {
    if (orderId) {
      makePaymentMutation({
        orderId,
      });
    }
  };

  const onOkClick = () => {
    onClose();
    setPaymentType(PAYMENT_TYPE.makeOrder);
    setSOrderId(null);
    setSOrderIdForPooling(null);
  };

  useEffect(() => {
    if (data?.status === CoachOrderStatus.PAID) {
      setPaymentType(PAYMENT_TYPE.success);
      setSOrderIdForPooling(null);
    }
  }, [data]);

  return (
    <UiModal
      title="Оплата услуги"
      description="Проверьте состав заказа перед переходом на страницу оплаты."
      size="medium"
      onCancel={onOkClick}
      {...props}
    >
      <div className={styles.contentWrapper}>
        {paymentType === PAYMENT_TYPE.makeOrder && (
          <UiFlex direction="column" gap="m">
            <UiCard tone="elevated">
              <UiFlex direction="column" gap="s">
                <UiFlex justify="space-between" align="center" gap="s">
                  <UiTypography bold>{offer?.title}</UiTypography>
                  <UiTypography bold size="large">
                    {offer?.price} ₽
                  </UiTypography>
                </UiFlex>
                <UiTypography type="secondary" size="small">
                  {offer?.description}
                </UiTypography>
                <UiTypography label="Количество занятий">
                  {offer?.sessionCount}
                </UiTypography>
              </UiFlex>
            </UiCard>
            <UiModalActions>
              <UiButton styleType="secondary" onClick={onOkClick}>
                Отмена
              </UiButton>
              <UiButton loading={isCreatingOrder} onClick={onOrderCreate}>
                Продолжить
              </UiButton>
            </UiModalActions>
          </UiFlex>
        )}

        {paymentType === PAYMENT_TYPE.makePayment && (
          <UiFlex
            className={styles.status}
            gap="s"
            direction="column"
            align="center"
          >
            <UiTypography bold size="large">
              Заказ создан
            </UiTypography>
            <UiTypography type="secondary">
              Нажмите «Оплатить», чтобы перейти на защищённую страницу оплаты.
            </UiTypography>
            <UiButton loading={isCreatingPayment} onClick={onMakePayment}>
              Оплатить
            </UiButton>
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
              Завершите оплату в открывшейся вкладке.
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
              Оплата прошла успешно
            </UiTypography>
            <UiTypography type="secondary">
              Услуга добавлена, можно переходить к занятиям.
            </UiTypography>
            <UiButton onClick={onOkClick}>Готово</UiButton>
          </UiFlex>
        )}
      </div>
    </UiModal>
  );
};

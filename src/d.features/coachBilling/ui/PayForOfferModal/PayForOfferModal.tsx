import { type ModalProps, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

import { useCreateOrder } from '@/d.features/coachBilling/api/queries/useCreateOrder.ts';
import { useMakePayment } from '@/d.features/coachBilling/api/queries/useMakePayment.ts';
import { useGetOrderStatus } from '@/e.entities/coachBilling/api/queries/useGetOrderStatus.ts';
import { CoachOrderStatus } from '@/e.entities/coachBilling/model/coachBilling.constants.ts';
import type { CoachOffer } from '@/e.entities/coachBilling/model/coachBilling.model.ts';
import { UiButton, UiFlex, UiModal, UiTypography } from '@/f.shared/ui';

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

  const { mutate: createOderMutation } = useCreateOrder({
    onSuccess: (data) => {
      if (data.orderId) {
        setSOrderId(data.orderId);
        setPaymentType(PAYMENT_TYPE.makePayment);
      }
    },
  });

  const { mutate: makePaymentMutation } = useMakePayment({
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
  };

  useEffect(() => {
    if (data?.status === CoachOrderStatus.PAID) {
      setPaymentType(PAYMENT_TYPE.success);
      setSOrderIdForPooling(null);
    }
  }, [data]);

  return (
    <UiModal title="Оплата услуги" {...props}>
      <div className={styles.contentWrapper}>
        {paymentType === PAYMENT_TYPE.makeOrder && (
          <UiFlex direction="column" gap="m">
            <UiFlex gap="s">
              <UiTypography label="Название">{offer?.title}</UiTypography>
              <UiTypography label="Цена">{offer?.price}₽</UiTypography>
              <UiTypography label="Количество занятий">
                {offer?.sessionCount}
              </UiTypography>
            </UiFlex>
            <UiButton onClick={onOrderCreate}>Создать заказ</UiButton>
          </UiFlex>
        )}

        {paymentType === PAYMENT_TYPE.makePayment && (
          <UiFlex gap="xs" direction="column">
            <UiTypography>Заказ создан</UiTypography>
            <UiButton onClick={onMakePayment}>Оплатить</UiButton>
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
      </div>
    </UiModal>
  );
};

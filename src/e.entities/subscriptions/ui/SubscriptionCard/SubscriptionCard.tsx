import classNames from 'classnames';
import React from 'react';

import { SubscriptionPlanCode } from '@/e.entities/subscriptions';
import { useGetMyPlan } from '@/e.entities/subscriptions/api/queries/useGetMyPlan.ts';
import { UiButton, UiCard, UiFlex, UiTypography } from '@/f.shared/ui';
import { CheckIcon } from '@/f.shared/ui/icons/CheckIcon/CheckIcon.tsx';
import { UiBadge } from '@/f.shared/ui/UiBadge/UiBadge.tsx';

import styles from './SubscriptionCard.module.scss';

type SubscriptionCardProps = {
  code: SubscriptionPlanCode;
  title: string;
  description: string;
  priceMonth: number | null;
  priceYear?: number | null;
  discount?: number;
  benefits: string[];
  onPayClick: () => void;
};

const subscriptionColors: Record<SubscriptionPlanCode, string> = {
  [SubscriptionPlanCode.FREE]: '#B0BAC8',
  [SubscriptionPlanCode.PREMIUM]: '#38baad',
  [SubscriptionPlanCode.PRO]: '#FFC107',
};

export const SubscriptionCard = ({
  code,
  title,
  description,
  priceMonth,
  priceYear,
  discount,
  benefits,
  onPayClick,
}: SubscriptionCardProps) => {
  const { data } = useGetMyPlan();

  return (
    <UiCard>
      <UiFlex
        direction="column"
        justify="space-between"
        style={{ height: '100%' }}
      >
        <UiFlex direction="column">
          <UiTypography bold>{title}</UiTypography>
          <UiTypography type="label">{description}</UiTypography>
          <UiFlex gap="xs" justify="center">
            <UiTypography bold size="large">
              {priceMonth ?? 0} ₽
            </UiTypography>
            <UiTypography>/ месяц</UiTypography>
          </UiFlex>
          {priceYear && (
            <UiFlex gap="xs" justify="center">
              <UiTypography bold size="medium" type="label">
                {priceYear} ₽
              </UiTypography>
              <UiTypography type="label">/ год</UiTypography>
              <UiBadge tone="accent">{`-${discount}%`}</UiBadge>
            </UiFlex>
          )}
          <UiFlex direction="column">
            {benefits.map((benefit) => (
              <UiTypography key={benefit}>
                <CheckIcon color={subscriptionColors[code]} /> {benefit}
              </UiTypography>
            ))}
          </UiFlex>
        </UiFlex>
        <UiFlex justify="end">
          <UiButton
            onClick={onPayClick}
            className={classNames({
              [styles.proButton]: code === SubscriptionPlanCode.PRO,
            })}
            disabled={
              data?.plan?.code === code || code === SubscriptionPlanCode.FREE
            }
          >
            {code === SubscriptionPlanCode.FREE && 'Базовый план'}
            {data?.plan?.code === code &&
              code !== SubscriptionPlanCode.FREE &&
              'Ваш текущий план'}
            {code !== SubscriptionPlanCode.FREE &&
              data?.plan?.code !== code &&
              'Оформить'}
          </UiButton>
        </UiFlex>
      </UiFlex>
    </UiCard>
  );
};

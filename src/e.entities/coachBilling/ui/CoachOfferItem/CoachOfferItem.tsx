import { Tooltip } from 'antd';
import React from 'react';

import type { CoachOffer } from '@/e.entities/coachBilling/model/coachBilling.model.ts';
import { UiFlex, UiTypography } from '@/f.shared/ui';
import { InfoIcon } from '@/f.shared/ui';
import { CoachOfferIcon } from '@/f.shared/ui/icons/CoachOfferIcon/CoachOfferIcon.tsx';

import styles from './CoachOfferItem.module.scss';

type CoachOfferProps = {
  offer: CoachOffer;
} & React.HTMLAttributes<HTMLDivElement>;

export const CoachOfferItem = ({ offer, ...props }: CoachOfferProps) => {
  return (
    <UiFlex
      direction="column"
      gap="xs"
      className={styles.coachOfferItem}
      {...props}
    >
      <UiFlex gap="xs" align="center">
        <CoachOfferIcon />
        <UiTypography bold>{offer.title}</UiTypography>
        {offer.description && (
          <Tooltip title={offer.description} trigger="hover" placement="top">
            <InfoIcon width={16} />
          </Tooltip>
        )}
      </UiFlex>
      <UiTypography type="label">{offer.price}₽ за услугу</UiTypography>
    </UiFlex>
  );
};

import React, { useState } from 'react';

import { CreateCoachOfferModal } from '@/d.features/coachBilling/ui/CreateCoachOfferModal/CreateCoachOfferModal.tsx';
import { useGetCoachOffers } from '@/e.entities/coachBilling/api/queries/useGetCoachOffers.ts';
import { CoachOfferItem } from '@/e.entities/coachBilling/ui';
import { userSelector } from '@/e.entities/user';
import { useSelector } from '@/f.shared/lib';
import { UiButton, UiCard, UiFlex, UiTypography } from '@/f.shared/ui';

import styles from './CoachOffers.module.scss';

type CoachOffersProps = {
  className?: string;
};

export const CoachOffers = ({ className }: CoachOffersProps) => {
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  const { user } = useSelector(userSelector);
  const { data, refetch } = useGetCoachOffers(user?.id);

  const onCreateOfferClick = () => setIsOfferModalOpen(true);

  return (
    <UiCard
      header={<UiTypography bold>Мои услуги</UiTypography>}
      className={className}
    >
      <UiFlex direction="column" className={styles.offersWrapper}>
        <UiFlex direction="column" gap="xs" className={styles.offersList}>
          {data?.map((offer) => (
            <CoachOfferItem key={offer.id} offer={offer} />
          ))}
        </UiFlex>
        <UiFlex justify="end">
          <UiButton onClick={onCreateOfferClick}>Добавить услугу</UiButton>
        </UiFlex>
      </UiFlex>

      <CreateCoachOfferModal
        open={isOfferModalOpen}
        onCancel={() => setIsOfferModalOpen(false)}
        onClose={() => setIsOfferModalOpen(false)}
        refetchOffers={refetch}
      />
    </UiCard>
  );
};

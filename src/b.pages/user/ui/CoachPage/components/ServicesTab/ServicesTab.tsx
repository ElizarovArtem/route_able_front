import React, { useState } from 'react';

import { PayForOfferModal } from '@/d.features/coachBilling/ui/PayForOfferModal/PayForOfferModal.tsx';
import { useGetCoachOffers } from '@/e.entities/coachBilling/api/queries/useGetCoachOffers.ts';
import type { CoachOffer } from '@/e.entities/coachBilling/model/coachBilling.model.ts';
import { CoachOfferItem } from '@/e.entities/coachBilling/ui';
import { UiCard, UiFlex, UiTypography } from '@/f.shared/ui';

type ServicesTabProps = {
  coachId: string;
};

export const ServicesTab = ({ coachId }: ServicesTabProps) => {
  const [selectedCoachOffer, setSelectedCoachOffer] =
    useState<CoachOffer | null>(null);

  const { data } = useGetCoachOffers(coachId);

  return (
    <>
      <UiFlex childrenEqualLength>
        <UiCard header={<UiTypography bold>Услуги</UiTypography>}>
          <UiFlex direction="column">
            {data?.map((offer) => (
              <CoachOfferItem
                key={offer.id}
                offer={offer}
                onClick={() => setSelectedCoachOffer(offer)}
              />
            ))}
          </UiFlex>
        </UiCard>
        <UiCard
          header={<UiTypography bold>Свободные слоты</UiTypography>}
        ></UiCard>
      </UiFlex>

      <PayForOfferModal
        open={!!selectedCoachOffer}
        offer={selectedCoachOffer}
        onClose={() => setSelectedCoachOffer(null)}
        onCancel={() => setSelectedCoachOffer(null)}
      />
    </>
  );
};

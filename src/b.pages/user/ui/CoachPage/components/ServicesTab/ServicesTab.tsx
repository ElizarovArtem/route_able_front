import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

import { PayForOfferModal } from '@/d.features/coachBilling/ui/PayForOfferModal/PayForOfferModal.tsx';
import { CreateVideoLessonModal } from '@/d.features/video';
import { useGetCoachOffers } from '@/e.entities/coachBilling/api/queries/useGetCoachOffers.ts';
import type { CoachOffer } from '@/e.entities/coachBilling/model/coachBilling.model.ts';
import { CoachOfferItem } from '@/e.entities/coachBilling/ui';
import { LessonSlot, useGetCoachSlots } from '@/e.entities/lessons';
import { formatDateForServer } from '@/f.shared/lib/formatDateForServer.ts';
import { UiCard, UiFlex, UiTypography } from '@/f.shared/ui';

type ServicesTabProps = {
  relationId?: string;
  coachId: string;
};

export const ServicesTab = ({ coachId, relationId }: ServicesTabProps) => {
  const [selectedCoachOffer, setSelectedCoachOffer] =
    useState<CoachOffer | null>(null);
  const [date, setDate] = useState(new Date());
  const [slotId, setSlotId] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data } = useGetCoachOffers(coachId);
  const { data: slots } = useGetCoachSlots(coachId, formatDateForServer(date));

  const onCreateVideoLessonSuccess = () => {
    queryClient.refetchQueries({
      queryKey: ['coach-slots', coachId, formatDateForServer(date)],
    });
    queryClient.refetchQueries({
      queryKey: ['lessons', relationId],
    });
    setSlotId(null);
  };

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
        <UiCard header={<UiTypography bold>Свободные слоты</UiTypography>}>
          <UiFlex direction="column">
            {slots && slots.length ? (
              slots.map((slot) => (
                <LessonSlot
                  key={slot.id}
                  timeSlot={slot}
                  onClick={() => setSlotId(slot.id)}
                />
              ))
            ) : (
              <UiTypography>Да эту дату свободных слотов нет</UiTypography>
            )}
          </UiFlex>
        </UiCard>
      </UiFlex>

      <PayForOfferModal
        open={!!selectedCoachOffer}
        offer={selectedCoachOffer}
        onClose={() => setSelectedCoachOffer(null)}
        onCancel={() => setSelectedCoachOffer(null)}
      />
      <CreateVideoLessonModal
        slotId={slotId}
        onClose={() => setSlotId(null)}
        onSuccess={onCreateVideoLessonSuccess}
      />
    </>
  );
};

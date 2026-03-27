import { format } from 'date-fns';
import React from 'react';

import { useRequestCoachVerification } from '@/d.features/user/api/queries/useReviewCoachVerification.ts';
import { useGetFeedbacksByAdmin } from '@/e.entities/feedback/api/queries/useGetFeedbacksByAdmin.ts';
import { useGetCoachVerificationRequests } from '@/e.entities/user/api/queries/useGetCoachVerificationRequests.ts';
import { VERIFICATION_STATUS } from '@/e.entities/user/model/user.constants.tsx';
import {
  CoachVerificationStatus,
  ReviewDecision,
} from '@/e.entities/user/model/user.enums.ts';
import { UiButton, UiCard, UiFlex, UiTypography } from '@/f.shared/ui';

export const AdminTab = () => {
  const { data, refetch } = useGetCoachVerificationRequests();
  const { data: feedbacks } = useGetFeedbacksByAdmin();

  const { mutate: reviewVerificationMutation } = useRequestCoachVerification({
    onSuccess: () => {
      refetch();
    },
  });

  const onReview = (verificationId: string, decision: ReviewDecision) => {
    reviewVerificationMutation({
      verificationId: verificationId,
      decision: decision,
    });
  };

  return (
    <UiFlex direction="column">
      <UiCard>
        <UiFlex direction="column">
          <UiTypography bold>Запросы тренеров на сотрудничество</UiTypography>
          <UiFlex direction="column">
            {data?.map((item) => (
              <UiCard key={item.id} inverse>
                <UiFlex>
                  <UiTypography label="Имя">{item.name}</UiTypography>
                  <UiTypography label="Контакт для связи">
                    {item.contactInfo}
                  </UiTypography>
                  <UiTypography label="Дата запроса">
                    {format(item.createdAt, 'dd.MM.yyyy')}
                  </UiTypography>
                  {item.status === CoachVerificationStatus.PENDING ? (
                    <UiFlex>
                      <UiButton
                        onClick={() =>
                          onReview(item.id, ReviewDecision.approve)
                        }
                      >
                        Принять
                      </UiButton>
                      <UiButton
                        onClick={() => onReview(item.id, ReviewDecision.reject)}
                        styleType="danger"
                      >
                        Отклонить
                      </UiButton>
                    </UiFlex>
                  ) : (
                    <UiTypography label="Статус">
                      {VERIFICATION_STATUS[item.status]}
                    </UiTypography>
                  )}
                </UiFlex>
              </UiCard>
            ))}
          </UiFlex>
        </UiFlex>
      </UiCard>
      <UiCard>
        <UiFlex direction="column">
          <UiTypography bold>Отзывы</UiTypography>
          <UiFlex direction="column">
            {feedbacks?.items.map((feedback) => (
              <UiCard key={feedback.id} inverse>
                <UiFlex>
                  <UiTypography>{feedback.type}</UiTypography>
                  <UiTypography>{feedback.name}</UiTypography>
                  <UiTypography>{feedback.message}</UiTypography>
                </UiFlex>
              </UiCard>
            ))}
          </UiFlex>
        </UiFlex>
      </UiCard>
    </UiFlex>
  );
};

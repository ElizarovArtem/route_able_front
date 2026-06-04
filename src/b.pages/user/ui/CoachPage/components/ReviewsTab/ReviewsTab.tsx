import { useParams } from '@tanstack/react-router';
import type { DefaultOptionType } from 'rc-select/lib/Select';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useAddReview } from '@/d.features/review/api/queries/useAddReview.ts';
import { useGetCoachReviews } from '@/e.entities/review/api/queries/useGetCoachReviews.ts';
import { useGetMyCoachReview } from '@/e.entities/review/api/queries/useGetMyCoachReview.ts';
import type { ReviewForm } from '@/e.entities/review/model/review.model.ts';
import {
  FormSelect,
  FormTextarea,
  StarIcon,
  UiAvatar,
  UiButton,
  UiCard,
  UiFlex,
  UiTypography,
} from '@/f.shared/ui';

const ratingOptions: DefaultOptionType[] = Array.from({ length: 5 }).map(
  (_, index) => ({ label: index + 1, value: index + 1 }),
);

type ReviewsTabProps = {
  refetchCoachData: () => void;
};

export const ReviewsTab = ({ refetchCoachData }: ReviewsTabProps) => {
  const coachId = useParams({
    from: '/_private/coach/$coachId',
    select: (params) => params.coachId,
  });

  const { control, reset, handleSubmit } = useForm<ReviewForm>();

  const { data: reviews, refetch } = useGetCoachReviews(coachId);
  const { data: myCoachReview } = useGetMyCoachReview(coachId);

  const { mutate: addReviewMutation } = useAddReview({
    onSuccess: () => {
      refetch();
      refetchCoachData();
    },
  });

  const onAddReviewClick = () => {
    handleSubmit((data) => {
      addReviewMutation({
        coachId,
        rating: data.rating,
        review: data.review,
      });
    })();
  };

  useEffect(() => {
    if (myCoachReview) {
      reset({
        rating: myCoachReview.rating,
        review: myCoachReview.text,
      });
    }
  }, [myCoachReview]);

  return (
    <UiFlex childrenEqualLength>
      <UiFlex direction="column">
        <UiTypography bold>Оставить отзыв</UiTypography>

        <UiFlex childrenEqualLength>
          <FormSelect name="rating" control={control} options={ratingOptions} />
          <UiButton onClick={onAddReviewClick}>Отправить</UiButton>
        </UiFlex>
        <FormTextarea
          disableResize
          name="review"
          control={control}
          placeholder="Напишите свой отзыв"
        />
      </UiFlex>

      <UiFlex direction="column">
        <UiTypography bold>Отзывы</UiTypography>
        {reviews?.length ? (
          reviews?.map((review) => (
            <UiCard key={review.id}>
              <UiFlex>
                <UiAvatar src={review.author.avatar} width={75} height={75} />
                <UiFlex direction="column" gap="xs" justify="center">
                  <UiFlex align="center" gap="xs">
                    <UiTypography bold>{review.author.name}</UiTypography>
                    <UiTypography>поставил</UiTypography>
                    <UiFlex gap="xxs">
                      <UiTypography bold>{review.rating}</UiTypography>
                      <StarIcon />
                    </UiFlex>
                  </UiFlex>
                  <UiTypography label="Отзыв">{review.text}</UiTypography>
                </UiFlex>
              </UiFlex>
            </UiCard>
          ))
        ) : (
          <UiFlex justify="center">
            <UiTypography>Пока нет ни одного отзыва</UiTypography>
          </UiFlex>
        )}
      </UiFlex>
    </UiFlex>
  );
};

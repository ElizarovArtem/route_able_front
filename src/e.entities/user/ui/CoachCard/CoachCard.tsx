import { useRouter } from '@tanstack/react-router';
import React from 'react';

import { authSelector } from '@/d.features/user';
import { type CoachListItem, userSelector } from '@/e.entities/user';
import { useSelector } from '@/f.shared/lib';
import { StarIcon, UiCard, UiFlex, UiTypography } from '@/f.shared/ui';
import { UiAvatar } from '@/f.shared/ui/UiAvatar/UiAvatar.tsx';

import styles from './CoachCard.module.scss';

type CoachCardProps = {
  coach: CoachListItem;
};

export const CoachCard = ({ coach }: CoachCardProps) => {
  const { setIsAuthModalOpen } = useSelector(authSelector);
  const { user } = useSelector(userSelector);
  const router = useRouter();

  const onCoachCardClick = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      router.navigate({ to: '/coach/$coachId', params: { coachId: coach.id } });
    }
  };

  return (
    <UiCard inverse className={styles.coachCard} onClick={onCoachCardClick}>
      <UiFlex>
        <UiAvatar width={100} src={coach?.avatar || ''} preview={false} />
        <UiFlex direction="column" gap="s">
          <UiFlex gap="s" align="center">
            <UiTypography bold>{coach.name}</UiTypography>
            <UiFlex gap="xxs" align="center">
              <UiTypography>{coach.rating.avg}</UiTypography>
              <StarIcon />
              <UiTypography>( {coach.rating.count} )</UiTypography>
            </UiFlex>
          </UiFlex>
          <UiTypography type="label">{coach.about}</UiTypography>
        </UiFlex>
      </UiFlex>
    </UiCard>
  );
};

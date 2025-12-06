import { useRouter } from '@tanstack/react-router';
import React from 'react';

import { authSelector } from '@/d.features/user';
import { type User, userSelector } from '@/e.entities/user';
import { useSelector } from '@/f.shared/lib';
import { UiFlex, UiTypography } from '@/f.shared/ui';
import { UiAvatar } from '@/f.shared/ui/UiAvatar/UiAvatar.tsx';

import styles from './CoachCard.module.scss';

type CoachCardProps = {
  coach: User;
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
    <div className={styles.coachCard} onClick={onCoachCardClick}>
      <UiFlex>
        <UiAvatar width={100} src={coach?.avatar} preview={false} />
        <UiFlex direction="column" gap="s">
          <UiTypography bold>{coach.name}</UiTypography>
          <UiTypography type="label">{coach.about}</UiTypography>
        </UiFlex>
      </UiFlex>
    </div>
  );
};

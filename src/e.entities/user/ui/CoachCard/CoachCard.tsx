import { Link } from '@tanstack/react-router';
import React from 'react';

import type { User } from '@/e.entities/user';
import { UiAvatar } from '@/f.shared/ui/UiAvatar/UiAvatar.tsx';

import styles from './CoachCard.module.scss';

type CoachCardProps = {
  coach: User;
};

export const CoachCard = ({ coach }: CoachCardProps) => {
  return (
    <Link
      to={'/coach/$coachId'}
      params={{ coachId: coach.id }}
      className={styles.coachCardLink}
    >
      <div className={styles.coachCard}>
        <UiAvatar
          width={150}
          height={150}
          src={coach?.avatar}
          preview={false}
        />
        <div className={styles.coachInfoWrapper}>
          <div>{coach.about}</div>
        </div>
      </div>
    </Link>
  );
};

import { Link } from '@tanstack/react-router';
import { Image } from 'antd';
import React from 'react';

import type { User } from '@/e.entities/user';
import { config } from '@/f.shared/config';

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
        <Image
          width={150}
          height={150}
          src={`${config.API_URL}/uploads/${coach?.avatar}`}
          fallback="/no_photo.png"
        />
        <div className={styles.coachInfoWrapper}>
          <div>{coach.about}</div>
        </div>
      </div>
    </Link>
  );
};

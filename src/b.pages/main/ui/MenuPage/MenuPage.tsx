import { Link } from '@tanstack/react-router';
import React from 'react';

import { UiButton } from '@/f.shared/ui';

import styles from './MenuPage.module.scss';

export const MenuPage = () => {
  return (
    <div className={styles.page}>
      <Link to="/trainers">
        <UiButton type="default">Список тренеров</UiButton>
      </Link>
      <Link to="/lk">
        <UiButton type="default">Личный кабинет</UiButton>
      </Link>
    </div>
  );
};

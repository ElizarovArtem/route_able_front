import { useQueryClient } from '@tanstack/react-query';
import { Link, useRouter } from '@tanstack/react-router';
import React from 'react';

import { authSelector } from '@/d.features/user';
import { userSelector } from '@/e.entities/user';
import { useSelector } from '@/f.shared/lib';
import { UiButton, UiTypography } from '@/f.shared/ui';

import styles from './Header.module.scss';

export const Header = () => {
  const { logout, setIsAuthModalOpen } = useSelector(authSelector);
  const { user } = useSelector(userSelector);
  const router = useRouter();
  const client = useQueryClient();

  const onLogout = async () => {
    await logout();
    router.navigate({ to: '/', replace: true });
    client.resetQueries();
  };

  return (
    <div className={styles.header}>
      <div className={styles.linksAndLogoWrapper}>
        <Link to="/">
          <div className={styles.logo}>Route•able</div>
        </Link>
        <div className={styles.linksWrapper}>
          <Link to="/lk">
            <UiTypography>Личный кабинет</UiTypography>
          </Link>
          <Link to="/ai-lesson">
            <UiTypography>ИИ-ассистент</UiTypography>
          </Link>
        </div>
      </div>
      <div className={styles.menu}>
        {user ? (
          <>
            <UiTypography bold>{user.name || user.phone}</UiTypography>{' '}
            <UiButton onClick={onLogout}>Выйти</UiButton>
          </>
        ) : (
          <UiButton onClick={() => setIsAuthModalOpen(true)}>Войти</UiButton>
        )}
      </div>
    </div>
  );
};

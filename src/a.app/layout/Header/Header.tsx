import { Link, useRouter } from '@tanstack/react-router';
import React from 'react';

import { authSelector } from '@/d.features/user';
import { userSelector } from '@/e.entities/user';
import { useSelector } from '@/f.shared/lib';
import { UiButton } from '@/f.shared/ui';

import styles from './Header.module.scss';

export const Header = () => {
  const { logout, setIsAuthModalOpen } = useSelector(authSelector);
  const { user } = useSelector(userSelector);
  const router = useRouter();

  const onLogout = async () => {
    await logout();
    router.invalidate();
  };

  return (
    <div className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>Route•able</div>
      </Link>
      <div className={styles.menu}>
        {user ? (
          <>
            {user.phone} <UiButton onClick={onLogout}>Выйти</UiButton>
          </>
        ) : (
          <UiButton onClick={() => setIsAuthModalOpen(true)}>Войти</UiButton>
        )}
      </div>
    </div>
  );
};

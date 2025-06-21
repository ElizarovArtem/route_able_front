import { Link, useRouter } from '@tanstack/react-router';
import React from 'react';

import { UiButton } from '@/components/ui/UiButton/UiButton.tsx';
import { useSelector } from '@/hooks/useSelector.ts';
import { authSelector } from '@/store/authStore.ts';
import { userSelector } from '@/store/usersStore.ts';

import styles from './Header.module.scss';

export const Header = () => {
  const { logout, setIsAuthModalOpen } = useSelector(authSelector);
  const { user } = useSelector(userSelector);
  const router = useRouter();

  const onLogout = () => {
    logout();
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

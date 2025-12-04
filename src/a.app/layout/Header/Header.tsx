import { useQueryClient } from '@tanstack/react-query';
import { Link, useRouter } from '@tanstack/react-router';
import React, { useState } from 'react';

import { authSelector } from '@/d.features/user';
import { Menu, userSelector } from '@/e.entities/user';
import { useSelector } from '@/f.shared/lib';
import { useMobile } from '@/f.shared/lib/useMobile.ts';
import { UiButton, UiTypography } from '@/f.shared/ui';

import styles from './Header.module.scss';

export const Header = () => {
  const { logout, setIsAuthModalOpen } = useSelector(authSelector);
  const { user } = useSelector(userSelector);
  const router = useRouter();
  const client = useQueryClient();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isMobile = useMobile();

  const onLogout = async () => {
    await logout();
    router.navigate({ to: '/', replace: true });
    client.resetQueries();
  };

  const onUserNameClick = () => {
    if (isMobile) {
      setIsMenuOpen((prev) => !prev);
    } else {
      return;
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.linksAndLogoWrapper}>
        <Link to="/">
          <div className={styles.logo}>Route•able</div>
        </Link>

        <Menu open={isMenuOpen} />
      </div>
      <div className={styles.menu}>
        {user ? (
          <>
            <UiTypography onClick={onUserNameClick} bold>
              {user.name || user.email}
            </UiTypography>{' '}
            <UiButton onClick={onLogout}>Выйти</UiButton>
          </>
        ) : (
          <UiButton onClick={() => setIsAuthModalOpen(true)}>Войти</UiButton>
        )}
      </div>
    </div>
  );
};

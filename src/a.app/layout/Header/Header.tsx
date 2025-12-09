import { useQueryClient } from '@tanstack/react-query';
import { Link, useRouter } from '@tanstack/react-router';
import React, { useRef, useState } from 'react';

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

  const nameRef = useRef<HTMLDivElement>(null);

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
      router.navigate({ to: '/lk', replace: true });
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.linksAndLogoWrapper}>
        <Link to="/">
          <div className={styles.logo}>Route•able</div>
        </Link>

        <Menu
          nameRef={nameRef}
          open={isMenuOpen}
          onClickOutside={() => setIsMenuOpen(false)}
        />
      </div>
      <div className={styles.menu}>
        {user ? (
          <>
            <UiTypography
              ref={nameRef}
              className={styles.userName}
              onClick={onUserNameClick}
              bold
            >
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

import { useQueryClient } from '@tanstack/react-query';
import { Link, useRouter } from '@tanstack/react-router';
import React, { useRef, useState } from 'react';

import { authSelector } from '@/d.features/user';
import { Menu, userSelector } from '@/e.entities/user';
import { config } from '@/f.shared/config';
import { useSelector } from '@/f.shared/lib';
import { useMobile } from '@/f.shared/lib/useMobile.ts';
import { UiButton, UiFlex } from '@/f.shared/ui';

import styles from './Header.module.scss';

type HeaderProps = {
  showNavigation?: boolean;
  onSidebarToggle?: () => void;
};

export const Header = ({
  showNavigation = true,
  onSidebarToggle,
}: HeaderProps) => {
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

  const onMenuItemClick = (
    e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (!user) {
      e?.preventDefault();
      setIsAuthModalOpen(true);
    }

    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const onUserNameClick = () => {
    if (isMobile && showNavigation) {
      setIsMenuOpen((prev) => !prev);
    } else {
      router.navigate({ to: '/lk', replace: true });
    }
  };

  const userInitials = (user?.name || user?.email || '?')
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <div className={styles.header}>
      <UiFlex align="center" gap="m">
        {!showNavigation && (
          <UiButton
            aria-label="Открыть боковое меню"
            title="Открыть меню"
            size="middle"
            styleType="secondary"
            className={styles.sidebarToggle}
            onClick={onSidebarToggle}
            icon={
              <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            }
          />
        )}

        <Link to="/" className={styles.logoLink}>
          <span className={styles.logoMark} aria-hidden>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 17 L9 12 L13 16 L20 7" />
              <circle cx="20" cy="7" r="1.5" fill="currentColor" />
            </svg>
          </span>
          <div className={styles.logo}>
            Route<span className={styles.accent}>•</span>able
          </div>
        </Link>

        {showNavigation && (
          <Menu
            onMenuItemClick={onMenuItemClick}
            nameRef={nameRef}
            open={isMenuOpen}
            onClickOutside={() => setIsMenuOpen(false)}
          />
        )}
      </UiFlex>
      <div className={styles.menu}>
        {user ? (
          <>
            <div
              ref={nameRef}
              className={styles.userChip}
              onClick={onUserNameClick}
            >
              <span className={styles.userChipAvatar}>
                {user.avatar ? (
                  <img
                    src={`${config.API_URL}/uploads/${user.avatar}`}
                    alt=""
                  />
                ) : (
                  userInitials
                )}
              </span>
              <span className={styles.userChipName}>
                {user.name || user.email}
              </span>
            </div>
            <UiButton styleType="secondary" onClick={onLogout}>
              Выйти
            </UiButton>
          </>
        ) : (
          <UiButton onClick={() => setIsAuthModalOpen(true)}>Войти</UiButton>
        )}
      </div>
    </div>
  );
};

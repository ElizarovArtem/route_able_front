import { Link } from '@tanstack/react-router';
import classNames from 'classnames';
import React, { type RefObject, useEffect, useRef } from 'react';

import { UiTypography } from '@/f.shared/ui';

import styles from './Menu.module.scss';

type MenuProps = {
  onClickOutside?: () => void;
  open: boolean;
  nameRef: RefObject<HTMLDivElement | null>;
};

export const Menu = ({ open, onClickOutside, nameRef }: MenuProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (
        !el ||
        el.contains(event.target as Node) ||
        nameRef.current?.contains(event.target as Node)
      ) {
        return;
      }
      onClickOutside?.();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, onClickOutside]);

  return (
    <div
      ref={ref}
      className={classNames(styles.menu, { [styles.menuOpen]: open })}
    >
      <Link to="/lk">
        <UiTypography>Личный кабинет</UiTypography>
      </Link>
      <Link to="/ai-lesson">
        <UiTypography>ИИ-ассистент</UiTypography>
      </Link>
    </div>
  );
};

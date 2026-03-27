import { Link } from '@tanstack/react-router';
import classNames from 'classnames';
import React, { type RefObject, useEffect, useRef } from 'react';

import { feedbackSelector } from '@/e.entities/feedback/model/feedback.store.ts';
import { useSelector } from '@/f.shared/lib';
import { UiTypography } from '@/f.shared/ui';

import styles from './Menu.module.scss';

type MenuProps = {
  onClickOutside?: () => void;
  onMenuItemClick?: () => void;
  open: boolean;
  nameRef: RefObject<HTMLDivElement | null>;
};

export const Menu = ({
  open,
  onClickOutside,
  nameRef,
  onMenuItemClick,
}: MenuProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { setIsFeedbackModalOpen } = useSelector(feedbackSelector);

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
      <Link to="/lk" onClick={onMenuItemClick}>
        <UiTypography>Личный кабинет</UiTypography>
      </Link>
      <Link to="/ai-lesson" onClick={onMenuItemClick}>
        <UiTypography>ИИ-ассистент</UiTypography>
      </Link>
      <Link to="/coaches" onClick={onMenuItemClick}>
        <UiTypography>Тренеры</UiTypography>
      </Link>
      <UiTypography onClick={() => setIsFeedbackModalOpen(true)}>
        Обратная связь
      </UiTypography>
    </div>
  );
};

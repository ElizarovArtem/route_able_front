import { Link } from '@tanstack/react-router';
import classNames from 'classnames';
import React from 'react';

import { UiTypography } from '@/f.shared/ui';

import styles from './Menu.module.scss';

type MenuProps = {
  open: boolean;
};

export const Menu = ({ open }: MenuProps) => {
  return (
    <div className={classNames(styles.menu, { [styles.menuOpen]: open })}>
      <Link to="/lk">
        <UiTypography>Личный кабинет</UiTypography>
      </Link>
      <Link to="/ai-lesson">
        <UiTypography>ИИ-ассистент</UiTypography>
      </Link>
    </div>
  );
};

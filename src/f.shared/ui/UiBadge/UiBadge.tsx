import classNames from 'classnames';
import React, { type ReactNode } from 'react';

import styles from './UiBadge.module.scss';

type UiBadgeTone = 'accent' | 'warn' | 'danger' | 'neutral';

type UiBadgeProps = {
  children: ReactNode;
  tone?: UiBadgeTone;
  icon?: ReactNode;
  className?: string;
};

export const UiBadge = ({
  children,
  tone = 'accent',
  icon,
  className,
}: UiBadgeProps) => {
  return (
    <span className={classNames(styles.badge, styles[`tone-${tone}`], className)}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </span>
  );
};

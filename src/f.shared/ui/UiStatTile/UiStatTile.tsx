import classNames from 'classnames';
import React, { type ReactNode } from 'react';

import styles from './UiStatTile.module.scss';

type UiStatTileProps = {
  icon?: ReactNode;
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  tone?: 'accent' | 'warn' | 'neutral';
  className?: string;
};

export const UiStatTile = ({
  icon,
  label,
  value,
  hint,
  tone = 'neutral',
  className,
}: UiStatTileProps) => {
  return (
    <div className={classNames(styles.tile, styles[`tone-${tone}`], className)}>
      <div className={styles.head}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.label}>{label}</span>
      </div>
      <div className={styles.value}>{value}</div>
      {hint && <div className={styles.hint}>{hint}</div>}
    </div>
  );
};

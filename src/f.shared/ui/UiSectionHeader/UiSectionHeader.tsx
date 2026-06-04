import classNames from 'classnames';
import React, { type ReactNode } from 'react';

import styles from './UiSectionHeader.module.scss';

type UiSectionHeaderProps = {
  icon?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export const UiSectionHeader = ({
  icon,
  title,
  subtitle,
  action,
  className,
}: UiSectionHeaderProps) => {
  return (
    <div className={classNames(styles.header, className)}>
      <div className={styles.left}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <div className={styles.text}>
          <div className={styles.title}>{title}</div>
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        </div>
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
};

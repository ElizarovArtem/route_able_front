import classNames from 'classnames';
import React, { type ReactNode } from 'react';

import styles from './UiTypography.module.scss';

type UiTypographyProps = {
  children: ReactNode;
  className?: string;
  bold?: boolean;
  type?: 'ordinary' | 'label';
  size?: 'small' | 'medium' | 'large';
} & React.HTMLAttributes<HTMLDivElement>;

export const UiTypography = ({
  children,
  className,
  bold,
  type = 'ordinary',
  size = 'medium',
  ...props
}: UiTypographyProps) => {
  return (
    <div
      {...props}
      className={classNames(
        styles.typography,
        { [styles.typographyBold]: bold },
        styles[`typography-${type}`],
        styles[`typography-${size}`],
        className,
      )}
    >
      {children}
    </div>
  );
};

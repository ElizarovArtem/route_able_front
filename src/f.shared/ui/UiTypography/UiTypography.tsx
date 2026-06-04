import classNames from 'classnames';
import React, { forwardRef, type ReactNode } from 'react';

import styles from './UiTypography.module.scss';

type UiTypographyProps = {
  children: ReactNode;
  className?: string;
  bold?: boolean;
  type?: 'ordinary' | 'label';
  size?: 'small' | 'medium' | 'large' | 'xl' | number;
  label?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const UiTypography = forwardRef<HTMLDivElement, UiTypographyProps>(
  (
    {
      children,
      className,
      bold,
      type = 'ordinary',
      size = 'medium',
      label,
      ...props
    },
    ref,
  ) => {
    const sizeStyle = typeof size === 'number' ? size : null;
    const sizeClass = typeof size === 'string' ? size : null;

    return (
      <div
        ref={ref}
        {...props}
        style={sizeStyle ? { fontSize: sizeStyle } : {}}
        className={classNames(
          styles.typography,
          {
            [styles.typographyBold]: bold,
            [styles.typographyFlex]: label,
            [styles[`typography-${size}`]]: sizeClass,
          },
          styles[`typography-${type}`],
          styles[`typography-${size}`],
          className,
        )}
      >
        {label && <div className={styles.label}>{label}</div>}
        {children}
      </div>
    );
  },
);

UiTypography.displayName = 'UiTypography';

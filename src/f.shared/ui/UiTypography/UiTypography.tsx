import classNames from 'classnames';
import React, { forwardRef, type ReactNode } from 'react';

import styles from './UiTypography.module.scss';

type UiTypographyProps = {
  children: ReactNode;
  className?: string;
  bold?: boolean;
  type?: 'ordinary' | 'label';
  size?: 'small' | 'medium' | 'large';
} & React.HTMLAttributes<HTMLDivElement>;

export const UiTypography = forwardRef<HTMLDivElement, UiTypographyProps>(
  (
    { children, className, bold, type = 'ordinary', size = 'medium', ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
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
  },
);

UiTypography.displayName = 'UiTypography';

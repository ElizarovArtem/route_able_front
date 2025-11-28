import classNames from 'classnames';
import React, { type ReactNode } from 'react';

import styles from './UiCard.module.scss';

type UiCardProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  className?: string;
  inverse?: boolean;
};

export const UiCard = React.forwardRef<HTMLDivElement, UiCardProps>(
  ({ children, className, inverse, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(
          styles.uiCard,
          { [styles.inverse]: inverse },
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

UiCard.displayName = 'UiCard';

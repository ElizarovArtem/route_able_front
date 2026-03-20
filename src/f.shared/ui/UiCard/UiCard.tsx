import classNames from 'classnames';
import React, { type ReactNode } from 'react';

import { UiFlex } from '@/f.shared/ui';

import styles from './UiCard.module.scss';

type UiCardProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  className?: string;
  inverse?: boolean;
  header?: ReactNode;
};

export const UiCard = React.forwardRef<HTMLDivElement, UiCardProps>(
  ({ children, className, inverse, header, ...rest }, ref) => {
    return (
      <UiFlex
        direction="column"
        gap="xxs"
        ref={ref}
        className={classNames(
          styles.uiCard,
          { [styles.inverse]: inverse, [styles.cardWithHeader]: header },
          className,
        )}
        {...rest}
      >
        {header && <div className={styles.cardHeader}>{header}</div>}
        <div className={styles.contentWrapper}>{children}</div>
      </UiFlex>
    );
  },
);

UiCard.displayName = 'UiCard';

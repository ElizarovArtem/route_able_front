import classNames from 'classnames';
import React, { type ReactNode } from 'react';

import { UiFlex } from '@/f.shared/ui';

import styles from './UiCard.module.scss';

type UiCardTone = 'default' | 'elevated' | 'subtle';

type UiCardProps = {
  children?: ReactNode;
  className?: string;
  inverse?: boolean;
  tone?: UiCardTone;
  interactive?: boolean;
  header?: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const UiCard = React.forwardRef<HTMLDivElement, UiCardProps>(
  (
    {
      children,
      className,
      inverse,
      tone = 'default',
      interactive,
      header,
      ...rest
    },
    ref,
  ) => {
    return (
      <UiFlex
        direction="column"
        gap="xxs"
        ref={ref}
        className={classNames(
          styles.uiCard,
          styles[`tone-${tone}`],
          {
            [styles.inverse]: inverse,
            [styles.cardWithHeader]: header,
            [styles.interactive]: interactive,
          },
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

import classNames from 'classnames';
import React, { type ReactNode } from 'react';

import styles from './UiFlex.module.scss';

type UiFlexProps = {
  children: ReactNode;
  direction?: 'column' | 'row';
  gap?: 'xs' | 's' | 'm' | 'l';
  align?: 'start' | 'center' | 'end';
} & React.HTMLAttributes<HTMLDivElement>;

export const UiFlex = ({
  children,
  direction = 'row',
  gap = 'm',
  align = 'start',
  className,
  ...props
}: UiFlexProps) => {
  return (
    <div
      {...props}
      className={classNames(
        styles.uiFlex,
        className,
        styles[`uiFlexGap-${gap}`],
        styles[`uiFlex-${direction}`],
        styles[`uiFlexAlign-${align}`],
      )}
    >
      {children}
    </div>
  );
};

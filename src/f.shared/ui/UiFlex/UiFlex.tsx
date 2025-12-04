import classNames from 'classnames';
import React, { type ReactNode } from 'react';

import styles from './UiFlex.module.scss';

type UiFlexProps = {
  children: ReactNode;
  direction?: 'column' | 'row';
  gap?: 's' | 'm' | 'l';
  align?: 'start' | 'center' | 'end';
};

export const UiFlex = ({
  children,
  direction = 'row',
  gap = 'm',
  align = 'start',
}: UiFlexProps) => {
  return (
    <div
      className={classNames(
        styles.uiFlex,
        styles[`uiFlexGap-${gap}`],
        styles[`uiFlex-${direction}`],
        styles[`uiFlexAlign-${align}`],
      )}
    >
      {children}
    </div>
  );
};

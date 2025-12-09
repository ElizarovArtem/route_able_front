import classNames from 'classnames';
import React, { type ReactNode } from 'react';

import styles from './UiFlex.module.scss';

type UiFlexProps = {
  children: ReactNode;
  direction?: 'column' | 'row';
  gap?: 'xs' | 's' | 'm' | 'l';
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
  align?: 'start' | 'center' | 'end';
} & React.HTMLAttributes<HTMLDivElement>;

export const UiFlex = ({
  children,
  direction = 'row',
  gap = 'm',
  justify = 'start',
  align,
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
        styles[`uiFlexJustify-${justify}`],
        styles[`uiFlexAlign-${align}`],
      )}
    >
      {children}
    </div>
  );
};

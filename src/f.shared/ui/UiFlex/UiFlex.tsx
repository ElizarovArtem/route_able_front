import classNames from 'classnames';
import React, { type ReactNode } from 'react';

import styles from './UiFlex.module.scss';

type UiFlexProps = {
  children: ReactNode | ReactNode[];
  direction?: 'column' | 'row';
  gap?: 'xxs' | 'xs' | 's' | 'm' | 'l';
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
  align?: 'start' | 'center' | 'end';
  wrap?: 'wrap' | 'nowrap';
  flex?: number;
  childrenEqualLength?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const UiFlex = ({
  children,
  direction = 'row',
  gap = 'm',
  justify = 'start',
  align,
  wrap,
  flex,
  childrenEqualLength,
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
        styles[`uiFlexWrap-${wrap}`],
        { [styles.uiFlexChildrenEqualLength]: childrenEqualLength },
      )}
      style={{
        flex,
        ...(childrenEqualLength
          ? {
              '--flex-children-count': Array.isArray(children)
                ? children.length
                : 1,
            }
          : {}),
      }}
    >
      {children}
    </div>
  );
};

import classNames from 'classnames';
import React, { forwardRef, type ReactNode } from 'react';

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

export const UiFlex = forwardRef<HTMLDivElement, UiFlexProps>(
  (
    {
      children,
      direction = 'row',
      gap = 'm',
      justify = 'start',
      align,
      wrap,
      flex,
      childrenEqualLength,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const childrenCount = Array.isArray(children) ? children.length : 1;

    return (
      <div
        {...props}
        ref={ref}
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
          ...style,
          ...(flex ? { flex } : {}),
          ...(childrenEqualLength
            ? { '--flex-children-count': childrenCount }
            : {}),
        }}
      >
        {children}
      </div>
    );
  },
);

UiFlex.displayName = 'UiFlex';

import { Button, type ButtonProps } from 'antd';
import classNames from 'classnames';
import React from 'react';

import styles from './UiButton.module.scss';

type UiButtonProps = {} & ButtonProps;

export const UiButton = ({
  className,
  size = 'large',
  ...props
}: UiButtonProps) => {
  return (
    <Button
      {...props}
      className={classNames(className, styles.button)}
      size={size}
    />
  );
};

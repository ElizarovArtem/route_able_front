import { Button, type ButtonProps } from 'antd';
import classNames from 'classnames';
import React from 'react';

import styles from './UiButton.module.scss';

type UiButtonProps = {
  styleType?: 'primary' | 'secondary' | 'danger';
} & ButtonProps;

export const UiButton = ({
  className,
  size = 'large',
  styleType = 'primary',
  ...props
}: UiButtonProps) => {
  return (
    <Button
      {...props}
      className={classNames(className, styles.button, styles[styleType])}
      size={size}
    />
  );
};

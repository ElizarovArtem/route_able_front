import classNames from 'classnames';
import React, { type ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

type TButtonProps = {
  styleType?: 'primary' | 'secondary';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  styleType = 'primary',
  className,
  ...props
}: TButtonProps) => {
  return (
    <button
      className={classNames(
        className,
        styles.button,
        styles[`button--${styleType}`],
      )}
      {...props}
    />
  );
};

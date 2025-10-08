import { Input, type InputProps } from 'antd';
import classNames from 'classnames';
import React from 'react';

import { withForm } from '@/f.shared/lib';

import styles from './UiInput.module.scss';

type UiInputProps = {
  error?: string;
} & InputProps;

export const UiInput = ({
  error,
  placeholder,
  className,
  ...props
}: UiInputProps) => {
  return (
    <Input
      {...props}
      className={classNames(styles.input, className)}
      size="large"
      status={error && 'error'}
      placeholder={error ? error : placeholder}
    />
  );
};

export const FormInput = withForm(
  UiInput,
  ({ data }) => data.currentTarget.value,
);

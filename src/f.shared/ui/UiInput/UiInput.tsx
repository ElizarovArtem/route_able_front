import { Input, type InputProps } from 'antd';
import classNames from 'classnames';
import React from 'react';

import { withForm } from '@/f.shared/lib';
import { UiFlex, UiTypography } from '@/f.shared/ui';

import styles from './UiInput.module.scss';

type UiInputProps = {
  error?: string;
  label?: string;
  wrapperClassName?: string;
} & InputProps;

export const UiInput = ({
  error,
  placeholder,
  className,
  label,
  wrapperClassName,
  ...props
}: UiInputProps) => {
  return (
    <UiFlex direction="column" gap="xxs" className={wrapperClassName}>
      {label && <UiTypography type="label">{label}</UiTypography>}
      <Input
        {...props}
        className={classNames(styles.input, className)}
        size="large"
        status={error && 'error'}
        placeholder={error ? error : placeholder}
      />
    </UiFlex>
  );
};

export const FormInput = withForm(
  UiInput,
  ({ data }) => data.currentTarget.value,
);

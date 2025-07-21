import { Input, type InputProps } from 'antd';
import React from 'react';

import { withForm } from '@/f.shared/lib';

type UiInputProps = {
  error?: string;
} & InputProps;

export const UiInput = ({ error, placeholder, ...props }: UiInputProps) => {
  return (
    <Input
      {...props}
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

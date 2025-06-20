import { Input, type InputProps } from 'antd';
import React from 'react';

type UiInputProps = {} & InputProps;

export const UiInput = (props: UiInputProps) => {
  return <Input {...props} />;
};

import { Input } from 'antd';
import type { TextAreaProps } from 'antd/es/input';
import React from 'react';

import { withForm } from '@/f.shared/lib';

type TUiTextareaProps = {} & TextAreaProps;

export const UiTextarea = (props: TUiTextareaProps) => {
  return <Input.TextArea {...props} />;
};

export const FormTextarea = withForm(
  UiTextarea,
  ({ data }) => data.currentTarget.value,
);

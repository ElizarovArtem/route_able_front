import { Checkbox, type CheckboxProps } from 'antd';
import React from 'react';

import { withForm } from '@/f.shared/lib';

type UiCheckboxProps = { value?: boolean } & CheckboxProps;

export const UiCheckbox = ({ value, ...props }: UiCheckboxProps) => {
  return <Checkbox checked={value} {...props} />;
};

export const FormCheckbox = withForm(
  UiCheckbox,
  ({ data }) => data.target.checked,
);

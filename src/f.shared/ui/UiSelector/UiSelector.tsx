import { Select, type SelectProps } from 'antd';
import React from 'react';

import { withForm } from '@/f.shared/lib';

type TUiSelectorProps = {
  error?: string;
} & SelectProps;

export const UiSelector = (props: TUiSelectorProps) => {
  return <Select {...props} size="large" />;
};

export const FormSelect = withForm(UiSelector);

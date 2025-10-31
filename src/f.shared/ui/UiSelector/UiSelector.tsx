import { Select, type SelectProps } from 'antd';
import classNames from 'classnames';
import React from 'react';

import { withForm } from '@/f.shared/lib';

import styles from './UiSelector.module.scss';

type TUiSelectorProps = {
  error?: string;
} & SelectProps;

export const UiSelector = ({ className, ...props }: TUiSelectorProps) => {
  return (
    <Select
      {...props}
      size="large"
      className={classNames(className, styles.uiSelector)}
    />
  );
};

export const FormSelect = withForm(UiSelector);

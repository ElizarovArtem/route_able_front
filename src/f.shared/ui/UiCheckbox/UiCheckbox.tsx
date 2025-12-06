import { Checkbox, type CheckboxProps } from 'antd';
import classNames from 'classnames';
import React from 'react';

import { withForm } from '@/f.shared/lib';

import styles from './UiCheckbox.module.scss';

type UiCheckboxProps = { value?: boolean } & CheckboxProps;

export const UiCheckbox = ({ value, className, ...props }: UiCheckboxProps) => {
  return (
    <Checkbox
      checked={value}
      className={classNames(styles.uiCheckbox, className)}
      {...props}
    />
  );
};

export const FormCheckbox = withForm(
  UiCheckbox,
  ({ data }) => data.target.checked,
);

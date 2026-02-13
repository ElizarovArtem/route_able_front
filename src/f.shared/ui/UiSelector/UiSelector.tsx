import { Select, type SelectProps } from 'antd';
import classNames from 'classnames';
import React from 'react';

import { withForm } from '@/f.shared/lib';
import { UiFlex, UiTypography } from '@/f.shared/ui';

import styles from './UiSelector.module.scss';

type TUiSelectorProps = {
  error?: string;
  label?: string;
} & SelectProps;

export const UiSelector = ({
  className,
  error,
  label,
  ...props
}: TUiSelectorProps) => {
  return (
    <UiFlex direction="column" gap="xxs">
      {label && <UiTypography type="label">{label}</UiTypography>}
      <Select
        {...props}
        size="large"
        status={error && 'error'}
        className={classNames(className, styles.uiSelector)}
      />
    </UiFlex>
  );
};

export const FormSelect = withForm(UiSelector);

import { Input } from 'antd';
import type { TextAreaProps } from 'antd/es/input';
import classNames from 'classnames';
import React from 'react';

import { withForm } from '@/f.shared/lib';
import { UiFlex, UiTypography } from '@/f.shared/ui';

import styles from './UiTextarea.module.scss';

type TUiTextareaProps = {
  disableResize?: boolean;
  label?: string;
  wrapperClassName?: string;
} & TextAreaProps;

export const UiTextarea = ({
  disableResize,
  className,
  wrapperClassName,
  label,
  ...props
}: TUiTextareaProps) => {
  return (
    <UiFlex direction="column" gap="xxs" className={wrapperClassName}>
      {label && <UiTypography type="label">{label}</UiTypography>}
      <Input.TextArea
        className={classNames(styles.uiTextarea, className, {
          [styles.disableResize]: disableResize,
        })}
        {...props}
      />
    </UiFlex>
  );
};

export const FormTextarea = withForm(
  UiTextarea,
  ({ data }) => data.currentTarget.value,
);

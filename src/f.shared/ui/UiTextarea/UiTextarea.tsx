import { Input } from 'antd';
import type { TextAreaProps } from 'antd/es/input';
import classNames from 'classnames';
import React from 'react';

import { withForm } from '@/f.shared/lib';

import styles from './UiTextarea.module.scss';

type TUiTextareaProps = {
  disableResize?: boolean;
} & TextAreaProps;

export const UiTextarea = ({
  disableResize,
  className,
  ...props
}: TUiTextareaProps) => {
  return (
    <Input.TextArea
      className={classNames(styles.uiTextarea, className, {
        [styles.disableResize]: disableResize,
      })}
      {...props}
    />
  );
};

export const FormTextarea = withForm(
  UiTextarea,
  ({ data }) => data.currentTarget.value,
);

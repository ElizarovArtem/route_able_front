import { ConfigProvider, DatePicker } from 'antd';
import type { PickerProps } from 'antd/es/date-picker/generatePicker';
import ru_RU from 'antd/es/locale/ru_RU';
import classNames from 'classnames';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import React from 'react';

import { withForm } from '@/f.shared/lib';

import styles from './UiDatepicker.module.scss';

type UiDatepickerProps = {
  error?: string;
} & PickerProps<Date>;

const MyDatePicker = DatePicker.generatePicker<Date>(dateFnsGenerateConfig);

export const UiDatepicker = ({
  error,
  className,
  ...props
}: UiDatepickerProps) => {
  return (
    <ConfigProvider locale={ru_RU}>
      <MyDatePicker
        {...props}
        status={error && 'error'}
        className={classNames(styles.datepicker, className)}
      />
    </ConfigProvider>
  );
};

export const FormDatepicker = withForm(
  UiDatepicker,
  ({ data }) => new Date(data),
);

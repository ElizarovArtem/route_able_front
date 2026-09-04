import { ConfigProvider, DatePicker } from 'antd';
import type { PickerProps } from 'antd/es/date-picker/generatePicker';
import ru_RU from 'antd/es/locale/ru_RU';
import classNames from 'classnames';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import React from 'react';

import { withForm } from '@/f.shared/lib';

import { UiFlex } from '../UiFlex/UiFlex';
import { UiTypography } from '../UiTypography/UiTypography';

import styles from './UiDatepicker.module.scss';

type UiDatepickerProps = {
  error?: string;
  label?: string;
} & PickerProps<Date>;

const MyDatePicker = DatePicker.generatePicker<Date>(dateFnsGenerateConfig);

export const UiDatepicker = ({
  error,
  className,
  label,
  ...props
}: UiDatepickerProps) => {
  return (
    <ConfigProvider locale={ru_RU}>
      <UiFlex direction="column" gap="xxs">
        {label && <UiTypography type="label">{label}</UiTypography>}
        <MyDatePicker
          {...props}
          size="large"
          status={error && 'error'}
          className={classNames(styles.datepicker, className)}
        />
      </UiFlex>
    </ConfigProvider>
  );
};

export const FormDatepicker = withForm(
  UiDatepicker,
  ({ data }) => new Date(data),
);

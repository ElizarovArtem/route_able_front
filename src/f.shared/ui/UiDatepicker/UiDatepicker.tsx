import { ConfigProvider, DatePicker } from 'antd';
import type { PickerProps } from 'antd/es/date-picker/generatePicker';
import ru_RU from 'antd/es/locale/ru_RU';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import React from 'react';

import { withForm } from '@/f.shared/lib';

type UiDatepickerProps = {
  error?: string;
} & PickerProps<Date>;

const MyDatePicker = DatePicker.generatePicker<Date>(dateFnsGenerateConfig);

export const UiDatepicker = ({ error, ...props }: UiDatepickerProps) => {
  return (
    <ConfigProvider locale={ru_RU}>
      <MyDatePicker {...props} status={error && 'error'} />
    </ConfigProvider>
  );
};

export const FormDatepicker = withForm(
  UiDatepicker,
  ({ data }) => new Date(data),
);

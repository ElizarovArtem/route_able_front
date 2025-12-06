import { Upload, type UploadProps } from 'antd';
import type { UploadFile } from 'antd/lib';
import React from 'react';

import { withForm } from '@/f.shared/lib';

type TUiUploadProps = {
  value?: UploadFile;
} & UploadProps;

export const UiUpload = ({ value, ...props }: TUiUploadProps) => {
  return <Upload fileList={value ? [value] : []} {...props} />;
};

export const FormUpload = withForm(
  UiUpload,
  ({ data }) => data.file.originFileObj,
);

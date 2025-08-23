import { Upload, type UploadProps } from 'antd';
import React from 'react';

import { withForm } from '@/f.shared/lib';

type TUiUploadProps = {} & UploadProps;

export const UiUpload = (props: TUiUploadProps) => {
  return <Upload {...props} />;
};

export const FormUpload = withForm(
  UiUpload,
  ({ data }) => data.file.originFileObj,
);

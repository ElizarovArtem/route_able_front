import { Progress, type ProgressProps } from 'antd';
import React from 'react';

type UiProgressProps = {} & ProgressProps;

export const UiProgress = (props: UiProgressProps) => {
  return <Progress strokeColor="#22C8A7" trailColor="#121A25" {...props} />;
};

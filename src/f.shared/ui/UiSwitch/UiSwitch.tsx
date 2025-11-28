import { Switch, type SwitchProps } from 'antd';
import React from 'react';

import { UiTypography } from '@/f.shared/ui';

import styles from './UiSwitch.module.scss';

type UiSwitchProps = {
  label?: string;
} & SwitchProps;

export const UiSwitch = ({ label, ...props }: UiSwitchProps) => {
  return (
    <div className={styles.uiSwitch}>
      {label && <UiTypography size="medium">{label}</UiTypography>}
      <Switch {...props} />
    </div>
  );
};

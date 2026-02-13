import { Spin } from 'antd';
import React, { type ReactNode } from 'react';

import { UiFlex } from '@/f.shared/ui';

import styles from './UiLoaderContainer.module.scss';

type UiLoaderContainerProps = {
  children: ReactNode;
  isLoading: boolean;
};

export const UiLoaderContainer = ({
  children,
  isLoading,
}: UiLoaderContainerProps) => {
  return (
    <UiFlex
      justify="center"
      align={isLoading ? 'center' : 'start'}
      className={styles.container}
    >
      {isLoading ? <Spin /> : children}
    </UiFlex>
  );
};

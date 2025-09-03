import { Tabs } from 'antd';
import type { TabsProps } from 'antd/es/tabs';
import classNames from 'classnames';
import React from 'react';

import styles from './UiTabs.module.scss';

type TUiTabsProps = {
  inverse?: boolean;
} & TabsProps;

export const UiTabs = ({ className, inverse, ...props }: TUiTabsProps) => {
  return (
    <Tabs
      {...props}
      className={classNames(className, styles.uiTabs, {
        [styles.inverse]: inverse,
      })}
    />
  );
};

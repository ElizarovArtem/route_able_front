import { Tabs } from 'antd';
import type { TabsProps } from 'antd/es/tabs';
import classNames from 'classnames';
import React from 'react';

import styles from './UiTabs.module.scss';

type TUiTabsProps = {} & TabsProps;

export const UiTabs = ({ className, ...props }: TUiTabsProps) => {
  return <Tabs {...props} className={classNames(className, styles.uiTabs)} />;
};

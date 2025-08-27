import classNames from 'classnames';
import React from 'react';

import styles from './UiTitle.module.scss';

type UiTitleProps = {
  size?: 's' | 'm' | 'l' | 'xl';
  children: React.ReactNode | string;
};

export const UiTitle = ({ children, size = 'm' }: UiTitleProps) => {
  return (
    <div className={classNames(styles.uiTitle, styles[`uiTitle_${size}`])}>
      {children}
    </div>
  );
};

export default UiTitle;

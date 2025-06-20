import React from 'react';

import styles from './Layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return <div className={styles.layout}>{children}</div>;
};

import { Image, type ImageProps } from 'antd';
import classNames from 'classnames';
import React from 'react';

import styles from './UiBanner.module.scss';

type UiBannerProps = {} & ImageProps;

export const UiBanner = ({ className, ...props }: UiBannerProps) => {
  return <Image className={classNames(styles.banner, className)} {...props} />;
};

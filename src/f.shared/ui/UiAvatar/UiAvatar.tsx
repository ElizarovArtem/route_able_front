import { Image, type ImageProps } from 'antd';
import React from 'react';

import { config } from '@/f.shared/config';

import styles from './UiAvatar.module.scss';

type TUserAvatarProps = {} & ImageProps;

export const UiAvatar = ({ src, ...props }: TUserAvatarProps) => {
  return (
    <Image
      {...props}
      className={styles.avatar}
      src={`${config.API_URL}/uploads/${src}`}
      fallback="/no_photo.png"
    />
  );
};

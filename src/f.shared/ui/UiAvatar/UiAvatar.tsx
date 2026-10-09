import { Image, type ImageProps } from 'antd';
import React from 'react';

import { config } from '@/f.shared/config';

import styles from './UiAvatar.module.scss';

type TUserAvatarProps = { src?: string | null } & Omit<ImageProps, 'src'>;

const NO_PHOTO = '/no_photo.png';

export const UiAvatar = ({ src, ...props }: TUserAvatarProps) => {
  return (
    <Image
      {...props}
      className={styles.avatar}
      src={src ? `${config.API_URL}/uploads/${src}` : NO_PHOTO}
      fallback={NO_PHOTO}
    />
  );
};

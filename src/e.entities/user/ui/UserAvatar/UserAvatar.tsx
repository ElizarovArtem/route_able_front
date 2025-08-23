import { Image, type ImageProps } from 'antd';
import React from 'react';

type TUserAvatarProps = {} & ImageProps;

export const UserAvatar = (props: TUserAvatarProps) => {
  return <Image {...props} fallback="/logo192.png" />;
};

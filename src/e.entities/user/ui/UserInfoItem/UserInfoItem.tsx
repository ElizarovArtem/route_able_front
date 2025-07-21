import classNames from 'classnames';
import React from 'react';

import styles from './UserInfoItem.module.scss';

type TUserInfoItemProps = {
  title: string;
  value: string;
  className?: string;
};

export const UserInfoItem = ({
  title,
  value,
  className,
}: TUserInfoItemProps) => {
  if (!value) return null;

  return (
    <div className={classNames(styles.infoItem, className)}>
      <div>{title}</div>
      <div>{value}</div>
    </div>
  );
};

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
  return (
    <div className={classNames(styles.infoItem, className)}>
      <div>{title}</div>
      <div>{value}</div>
    </div>
  );
};

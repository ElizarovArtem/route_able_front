import { Badge } from 'antd';
import type { BadgeProps } from 'antd/es/badge';
import React from 'react';

type UiBadgeProps = {} & BadgeProps;

export const UiBadge = (props: UiBadgeProps) => {
  return <Badge {...props} />;
};

import classNames from 'classnames';
import React, { type ReactNode } from 'react';

import { UiFlex } from '../UiFlex/UiFlex';

import styles from './UiModalActions.module.scss';

type UiModalActionsProps = {
  children: ReactNode;
  className?: string;
};

export const UiModalActions = ({
  children,
  className,
}: UiModalActionsProps) => {
  return (
    <UiFlex
      className={classNames(styles.actions, className)}
      gap="xs"
      justify="end"
      wrap="wrap"
    >
      {children}
    </UiFlex>
  );
};

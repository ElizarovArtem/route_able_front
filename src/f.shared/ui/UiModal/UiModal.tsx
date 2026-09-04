import { Modal, type ModalProps } from 'antd';
import classNames from 'classnames';
import React, { type ReactNode } from 'react';

import styles from './UIModal.module.scss';

type UiModalProps = {
  description?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  tone?: 'default' | 'warning' | 'danger' | 'success';
} & ModalProps;

const modalWidthBySize = {
  small: 420,
  medium: 560,
  large: 780,
} as const;

export const UiModal = ({
  className,
  description,
  footer = null,
  rootClassName,
  size = 'medium',
  title,
  tone = 'default',
  width,
  ...props
}: UiModalProps) => {
  return (
    <Modal
      {...props}
      className={classNames(className, styles.modal, styles[`tone-${tone}`])}
      rootClassName={classNames(rootClassName, styles.root)}
      centered
      footer={footer}
      width={width ?? modalWidthBySize[size]}
      title={
        title ? (
          <div className={styles.heading}>
            <div className={styles.title}>{title}</div>
            {description ? (
              <div className={styles.description}>{description}</div>
            ) : null}
          </div>
        ) : undefined
      }
    />
  );
};

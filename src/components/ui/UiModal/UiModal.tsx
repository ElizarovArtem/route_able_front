import { Modal, type ModalProps } from 'antd';
import classNames from 'classnames';
import React from 'react';

import styles from './UIModal.module.scss';

type UiModalProps = {} & ModalProps;

export const UiModal = ({ className, ...props }: UiModalProps) => {
  return (
    <Modal {...props} className={classNames(className, styles.modal)}></Modal>
  );
};

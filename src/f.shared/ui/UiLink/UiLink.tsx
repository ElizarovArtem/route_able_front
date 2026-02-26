import { Link, type LinkProps } from '@tanstack/react-router';
import classNames from 'classnames';
import React from 'react';

import styles from './UiLink.module.scss';

type UiLinkProps = {} & LinkProps;

// @ts-expect-error ts fucking error
export const UiLink = ({ className, ...props }: UiLinkProps) => {
  return <Link className={classNames(styles.uiLink, className)} {...props} />;
};

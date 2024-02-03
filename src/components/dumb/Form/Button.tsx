import clsx from 'clsx';
import React from 'react';

import styles from './Form.module.scss';

export type ButtonProps = React.JSX.IntrinsicElements['button'];

export const Button = (props: ButtonProps) => {
  const { className, ...buttonProps } = props;

  return (
    <button
      className={clsx(styles.formItemButton, styles.formControl, className)}
      type="button"
      {...buttonProps}
    />
  );
};

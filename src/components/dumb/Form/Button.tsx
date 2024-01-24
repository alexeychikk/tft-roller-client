import clsx from 'clsx';

import styles from './Form.module.scss';

export type ButtonProps = JSX.IntrinsicElements['button'];

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

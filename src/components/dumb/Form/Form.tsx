import clsx from 'clsx';

import styles from './Form.module.scss';

export type FormProps = JSX.IntrinsicElements['form'];

export const Form = (props: FormProps) => {
  const { className, ...formProps } = props;

  return (
    <form className={clsx(styles.form, className)} {...formProps} />
  );
};

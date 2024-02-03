import clsx from 'clsx';
import React from 'react';

import styles from './Form.module.scss';

export type FormProps = React.JSX.IntrinsicElements['form'];

export const Form = (props: FormProps) => {
  const { className, ...formProps } = props;

  return <form className={clsx(styles.form, className)} {...formProps} />;
};

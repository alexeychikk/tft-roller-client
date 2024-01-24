import clsx from 'clsx';
import { useId } from 'react';
import type { UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form';

import styles from './Form.module.scss';

export type InputProps<T extends object = any> = UseControllerProps<T> &
  JSX.IntrinsicElements['input'] & {
    label?: React.ReactNode;
  };

export const Input = <T extends object>(props: InputProps<T>) => {
  const {
    className,
    control,
    defaultValue,
    disabled,
    label,
    name,
    rules,
    shouldUnregister,
    ...inputProps
  } = props;

  const { field, fieldState } = useController(props);
  const id = useId();
  const error = fieldState.error?.message;

  return (
    <div className={clsx(styles.formItem, styles.formItemInput, className)}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {inputProps.required && <span className={styles.asterisk}>*</span>}
          {label}
        </label>
      )}
      <input
        className={styles.formControl}
        id={id}
        {...inputProps}
        {...field}
      />
      <p className={styles.error}>{error}</p>
    </div>
  );
};

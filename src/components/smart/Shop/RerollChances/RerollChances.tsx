import React from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

import { tftStore } from '@src/state';

import styles from './RerollChances.module.scss';

export type RerollChancesProps = {
  className?: string;
};

const RerollChancesBase: React.FC<RerollChancesProps> = (props) => {
  return (
    <div className={clsx(styles.rootRerollChances, props.className)}>
      {tftStore.me?.rerollChances.map((percent, index) => (
        <span
          key={index}
          className={clsx(styles.percent, styles[`percentTier${index + 1}`])}
        >
          {Math.round(percent * 100)}%
        </span>
      ))}
    </div>
  );
};

export const RerollChances = observer(RerollChancesBase);

import React from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

import { tftStore } from '@src/state';

import styles from './RerollChances.module.scss';

export type RerollChancesProps = {
  /* empty */
};

const RerollChancesBase: React.FC<RerollChancesProps> = () => {
  return (
    <div className={styles.rootRerollChances}>
      {tftStore.rerollChances.map((percent, index) => (
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

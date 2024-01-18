import React from 'react';
import { observer } from 'mobx-react-lite';

import { tftStore } from '@src/state';

import { BenchSlot } from './BenchSlot';
import styles from './Bench.module.scss';

export type BenchProps = {
  /* empty */
};

const BenchBase: React.FC<BenchProps> = () => {
  return (
    <div className={styles.rootBench}>
      {Array.from({ length: tftStore.bench.height }, (_, y) => {
        return (
          <div key={y} className={styles.row}>
            {Array.from({ length: tftStore.bench.width }, (_, x) => {
              return <BenchSlot className={styles.slot} key={x} x={x} y={y} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export const Bench = observer(BenchBase);

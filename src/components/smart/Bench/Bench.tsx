import React from 'react';
import { times } from 'remeda';
import { observer } from 'mobx-react-lite';

import { tftStore } from '@src/state';

import { BenchSlot } from './BenchSlot';
import styles from './Bench.module.scss';

export type BenchProps = {
  /* empty */
};

const BenchBase: React.FC<BenchProps> = () => {
  if (!tftStore.viewedPlayer) return null;
  return (
    <div className={styles.rootBench}>
      {times(tftStore.viewedPlayer.bench.height, (y) => {
        return (
          <div key={y} className={styles.row}>
            {times(tftStore.viewedPlayer!.bench.width, (x) => {
              return <BenchSlot className={styles.slot} key={x} x={x} y={y} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export const Bench = observer(BenchBase);

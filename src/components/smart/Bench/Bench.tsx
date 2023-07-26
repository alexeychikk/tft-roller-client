import React from 'react';
import { times } from 'lodash-es';
import { observer } from 'mobx-react-lite';

import { tftStore } from '@src/state';

import { BenchSlot } from './BenchSlot';
import './Bench.styles.css';

export type BenchProps = {
  /* empty */
};

const BenchBase: React.FC<BenchProps> = () => {
  return (
    <div className="tft__bench">
      {times(tftStore.bench.height, (y) => {
        return (
          <div key={y} className="tft__bench-row">
            {times(tftStore.bench.width, (x) => {
              return <BenchSlot key={x} x={x} y={y} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export const Bench = observer(BenchBase);

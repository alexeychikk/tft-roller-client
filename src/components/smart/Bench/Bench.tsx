import React from 'react';
import { times } from 'lodash-es';

import { useTftState } from '@src/state';

import { BenchSlot } from './BenchSlot';
import './Bench.styles.css';

export type BenchProps = {
  /* empty */
};

const BenchBase: React.FC<BenchProps> = () => {
  const { bench } = useTftState();

  return (
    <div className="tft__bench">
      {times(bench.height, (y) => {
        return (
          <div key={y} className="tft__bench-row">
            {times(bench.width, (x) => {
              return <BenchSlot key={x} x={x} y={y} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export const Bench = React.memo(BenchBase);

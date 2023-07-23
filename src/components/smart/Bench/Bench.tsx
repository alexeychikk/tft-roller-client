import React from 'react';
import { times } from 'lodash-es';

import { useTftState } from '@src/state';
import { UnitAvatar } from '@src/components/dumb/UnitAvatar';
import { UnitSlot } from '@src/components/dumb/UnitSlot';

import './Bench.styles.css';

export type BenchProps = {};

const BenchBase: React.FC<BenchProps> = (props) => {
  const { bench } = useTftState();

  return (
    <div className="tft__bench">
      {times(bench.height, (y) => {
        return (
          <div key={y} className="tft__bench-row">
            {times(bench.width, (x) => {
              const unit = bench.getUnit({ x, y });
              return (
                <div key={x} className="tft__bench-col">
                  <UnitSlot grid={bench} x={x} y={y}>
                    {unit && (
                      <UnitAvatar grid={bench} unit={unit} x={x} y={y} />
                    )}
                  </UnitSlot>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export const Bench = React.memo(BenchBase);

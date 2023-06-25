import React from 'react';
import { times } from 'lodash-es';

import { useTftState } from '@src/state';
import { ChampionAvatar } from '@src/components/dumb/ChampionAvatar';

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
                  {unit && <ChampionAvatar name={unit.name} />}
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

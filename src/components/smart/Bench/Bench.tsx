import React from 'react';
import { capitalize, times } from 'lodash-es';

import { useTftState } from '@src/state';
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
              const championUrlName = unit
                ? capitalize(unit.name.replace(/[^a-zA-Z]/gim, ''))
                : undefined;
              return (
                <div key={x} className="tft__bench-col">
                  {unit && (
                    <div
                      className="tft__champion-avatar"
                      style={{
                        backgroundImage: `url("https://cdn.lolchess.gg/images/lol/champion-splash-modified/${championUrlName}.jpg")`,
                      }}
                    ></div>
                  )}
                  <div>{unit?.name}</div>
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

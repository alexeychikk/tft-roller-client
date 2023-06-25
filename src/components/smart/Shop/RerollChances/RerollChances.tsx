import React from 'react';
import clsx from 'clsx';

import { useTftState } from '@src/state';

import './RerollChances.styles.css';

export type RerollChancesProps = {};

const RerollChancesBase: React.FC<RerollChancesProps> = (props) => {
  const { rerollChances } = useTftState();
  return (
    <div className="tft__shop__reroll-chances">
      {rerollChances.map((percent, index) => (
        <span
          key={index}
          className={clsx(
            `tft__shop__reroll-tier`,
            `tft__shop__reroll-tier_${index + 1}`,
          )}
        >
          {Math.round(percent * 100)}%
        </span>
      ))}
    </div>
  );
};

export const RerollChances = React.memo(RerollChancesBase);

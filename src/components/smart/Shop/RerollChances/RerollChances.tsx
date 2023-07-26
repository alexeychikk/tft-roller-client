import React from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

import { tftStore } from '@src/state';

import './RerollChances.styles.css';

export type RerollChancesProps = {
  /* empty */
};

const RerollChancesBase: React.FC<RerollChancesProps> = () => {
  return (
    <div className="tft__shop__reroll-chances">
      {tftStore.rerollChances.map((percent, index) => (
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

export const RerollChances = observer(RerollChancesBase);

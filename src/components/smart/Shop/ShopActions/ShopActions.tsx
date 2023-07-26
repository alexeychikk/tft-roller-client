import React from 'react';

import { useTftState } from '@src/state';

import './ShopActions.styles.css';

export type ShopActionsProps = {
  /* empty */
};

const ShopActionsBase: React.FC<ShopActionsProps> = () => {
  const {
    isEnoughGoldToBuyExperience,
    isEnoughGoldToReroll,
    isMaxLevelReached,
    buyExperience,
    reroll,
  } = useTftState();

  return (
    <div className="tft__shop__actions">
      <button
        onClick={buyExperience}
        disabled={!isEnoughGoldToBuyExperience || isMaxLevelReached}
      >
        Level Up
      </button>
      <button onClick={reroll} disabled={!isEnoughGoldToReroll}>
        Reroll
      </button>
    </div>
  );
};

export const ShopActions = React.memo(ShopActionsBase);

import React from 'react';

import './ShopActions.styles.css';
import { useTftState } from '../../../state';

export type ShopActionsProps = {};

const ShopActionsBase: React.FC<ShopActionsProps> = (props) => {
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

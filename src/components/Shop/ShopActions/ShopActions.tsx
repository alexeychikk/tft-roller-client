import React from 'react';

import './ShopActions.styles.css';
import { useTftState } from '../../../state';

export type ShopActionsProps = {};

const ShopActionsBase: React.FC<ShopActionsProps> = (props) => {
  const { isEnoughGoldToBuyExperience, isMaxLevelReached, buyExperience } =
    useTftState();

  return (
    <div className="tft__shop__actions">
      <button
        onClick={buyExperience}
        disabled={!isEnoughGoldToBuyExperience || isMaxLevelReached}
      >
        Level Up
      </button>
      <button>Reroll</button>
    </div>
  );
};

export const ShopActions = React.memo(ShopActionsBase);

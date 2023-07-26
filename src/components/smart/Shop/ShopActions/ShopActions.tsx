import React from 'react';
import { observer } from 'mobx-react-lite';

import { tftStore } from '@src/state';

import './ShopActions.styles.css';

export type ShopActionsProps = {
  /* empty */
};

const ShopActionsBase: React.FC<ShopActionsProps> = () => {
  return (
    <div className="tft__shop__actions">
      <button
        onClick={tftStore.buyExperience}
        disabled={
          !tftStore.isEnoughGoldToBuyExperience || tftStore.isMaxLevelReached
        }
      >
        Level Up
      </button>
      <button
        onClick={tftStore.reroll}
        disabled={!tftStore.isEnoughGoldToReroll}
      >
        Reroll
      </button>
    </div>
  );
};

export const ShopActions = observer(ShopActionsBase);

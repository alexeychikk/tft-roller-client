import React from 'react';
import { observer } from 'mobx-react-lite';

import { tftStore } from '@src/state';

import styles from './ShopActions.module.scss';

export type ShopActionsProps = {
  /* empty */
};

const ShopActionsBase: React.FC<ShopActionsProps> = () => {
  return (
    <div className={styles.rootShopActions}>
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

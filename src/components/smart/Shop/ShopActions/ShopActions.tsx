import React from 'react';
import { observer } from 'mobx-react-lite';

import { tftStore } from '@src/state';

import styles from './ShopActions.module.scss';
import {
  ShopButtonBuyXp,
  ShopButtonReroll,
} from '@src/components/dumb/ShopButton';

export type ShopActionsProps = {
  /* empty */
};

const ShopActionsBase: React.FC<ShopActionsProps> = () => {
  return (
    <div className={styles.rootShopActions}>
      <ShopButtonBuyXp
        disabled={
          !tftStore.isEnoughGoldToBuyExperience || tftStore.isMaxLevelReached
        }
        onClick={tftStore.buyExperience}
      />
      <ShopButtonReroll
        disabled={!tftStore.isEnoughGoldToReroll}
        onClick={tftStore.reroll}
      />
    </div>
  );
};

export const ShopActions = observer(ShopActionsBase);

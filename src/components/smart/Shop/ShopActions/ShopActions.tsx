import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import React from 'react';

import {
  ShopButtonBuyXp,
  ShopButtonReroll,
} from '@src/components/dumb/ShopButton';
import { useTftStore } from '@src/state';

import styles from './ShopActions.module.scss';

export type ShopActionsProps = {
  className?: string;
};

const ShopActionsBase: React.FC<ShopActionsProps> = (props) => {
  const tftStore = useTftStore();
  return (
    <div className={clsx(styles.rootShopActions, props.className)}>
      <ShopButtonBuyXp
        disabled={
          !tftStore.isViewingMe ||
          !tftStore.me?.isEnoughGoldToBuyExperience ||
          tftStore.me?.isMaxLevelReached
        }
        onClick={tftStore.buyExperience}
      />
      <ShopButtonReroll
        disabled={!tftStore.isViewingMe || !tftStore.me?.isEnoughGoldToReroll}
        onClick={tftStore.reroll}
      />
    </div>
  );
};

export const ShopActions = observer(ShopActionsBase);

import React from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';

import { tftStore } from '@src/state';

import {
  ShopButtonBuyXp,
  ShopButtonReroll,
} from '@src/components/dumb/ShopButton';

import styles from './ShopActions.module.scss';

export type ShopActionsProps = {
  className?: string;
};

const ShopActionsBase: React.FC<ShopActionsProps> = (props) => {
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

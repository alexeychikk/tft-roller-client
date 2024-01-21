import React from 'react';

import { GoldView } from './GoldView';
import { LevelView } from './LevelView';
import { RerollChances } from './RerollChances';
import { ShopActions } from './ShopActions';
import { ShopChampions } from './ShopChampions';
import styles from './Shop.module.scss';

export type ShopProps = {
  /* empty */
};

const ShopBase: React.FC<ShopProps> = () => {
  return (
    <div className={styles.rootShop}>
      <div className={styles.topBar}>
        <LevelView className={styles.levelView} />
        <div className={styles.topRightBar}>
          <RerollChances className={styles.rerollChances} />
          <GoldView className={styles.goldView} />
        </div>
      </div>
      <div className={styles.bottomBar}>
        <ShopActions className={styles.shopActions} />
        <ShopChampions className={styles.shopChampions} />
      </div>
    </div>
  );
};

export const Shop = React.memo(ShopBase);

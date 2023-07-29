import React from 'react';

import styles from './Shop.module.scss';

import { ShopActions } from './ShopActions';
import { ShopChampions } from './ShopChampions';
import { LevelView } from './LevelView';
import { RerollChances } from './RerollChances';
import { GoldView } from './GoldView';

export type ShopProps = {
  /* empty */
};

const ShopBase: React.FC<ShopProps> = () => {
  return (
    <div className={styles.rootShop}>
      <div className={styles.topBar}>
        <LevelView />
        <div className={styles.topRightBar}>
          <RerollChances />
          <GoldView />
        </div>
      </div>
      <div className={styles.bottomBar}>
        <ShopActions />
        <ShopChampions />
      </div>
    </div>
  );
};

export const Shop = React.memo(ShopBase);

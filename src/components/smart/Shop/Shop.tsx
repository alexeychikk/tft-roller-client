import React from 'react';
import './Shop.styles.css';

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
    <div className="tft__shop">
      <div className="tft__shop__top-bar">
        <LevelView />
        <div className="tft__shop__tob-bar__right-wrapper">
          <RerollChances />
          <GoldView />
        </div>
      </div>
      <div className="tft__shop__bottom-bar">
        <ShopActions />
        <ShopChampions />
      </div>
    </div>
  );
};

export const Shop = React.memo(ShopBase);

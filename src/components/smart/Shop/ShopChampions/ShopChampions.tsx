import React from 'react';
import { observer } from 'mobx-react-lite';

import { tftStore } from '@src/state';
import { ChampionAvatar } from '@src/components/dumb/ChampionAvatar';

import { SellOverlay } from './SellOverlay';
import './ShopChampions.styles.css';

export type ShopChampionsProps = {
  /* empty */
};

const ShopChampionsBase: React.FC<ShopChampionsProps> = () => {
  return (
    <div className="tft__shop__champions">
      <div className="tft__shop__slots-wrapper">
        {tftStore.shopChampionNames.map((name, index) => {
          return (
            <div key={index} className="tft__shop__champion-slot">
              {name && (
                <ChampionAvatar
                  name={name}
                  onClick={() => tftStore.buyChampion(index)}
                />
              )}
            </div>
          );
        })}
      </div>
      <SellOverlay />
    </div>
  );
};

export const ShopChampions = observer(ShopChampionsBase);

import React from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';

import { tftStore } from '@src/state';
import { ChampionAvatar } from '@src/components/dumb/ChampionAvatar';

import { SellOverlay } from './SellOverlay';

import styles from './ShopChampions.module.scss';

export type ShopChampionsProps = {
  className?: string;
};

const ShopChampionsBase: React.FC<ShopChampionsProps> = (props) => {
  return (
    <div className={clsx(styles.rootShopChampions, props.className)}>
      <div className={styles.slotsWrapper}>
        {tftStore.me?.shopChampionNames.map((name, index) => {
          return (
            <div key={index} className={styles.slot}>
              {name && (
                <ChampionAvatar
                  name={name}
                  shopIndex={index}
                  onClick={tftStore.buyChampion}
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

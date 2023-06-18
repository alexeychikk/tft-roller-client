import React from 'react';
import { capitalize } from 'lodash-es';
import clsx from 'clsx';

import { useTftState } from '../../../state';
import { CHAMPIONS_MAP } from '../../../constants';

import './ShopChampions.styles.css';

export type ShopChampionsProps = {};

const ShopChampionsBase: React.FC<ShopChampionsProps> = (props) => {
  const { shopChampionNames, buyChampion } = useTftState();
  return (
    <div className="tft__shop__champions">
      {shopChampionNames.map((name, index) => {
        const championUrlName = name
          ? capitalize(name.replace(/[^a-zA-Z]/gim, ''))
          : undefined;
        return (
          <div
            key={index}
            className={clsx(
              'tft__shop__champion-slot',
              name && `tft__shop__champion-tier_${CHAMPIONS_MAP[name].tier}`,
            )}
          >
            {name && (
              <button
                className="tft__shop__champion-button"
                style={{
                  backgroundImage: `url("https://cdn.lolchess.gg/images/lol/champion-splash-modified/${championUrlName}.jpg")`,
                }}
                onClick={() => buyChampion(index)}
              >
                <span>{name}</span>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const ShopChampions = React.memo(ShopChampionsBase);

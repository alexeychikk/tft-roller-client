import React from 'react';
import { capitalize } from 'lodash-es';
import clsx from 'clsx';

import { useTftState } from '@src/state';
import { CHAMPIONS_MAP } from '@src/constants';

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
                onClick={() => buyChampion(index)}
              >
                <div
                  className="tft__champion-avatar"
                  style={{
                    backgroundImage: `url("https://cdn.lolchess.gg/images/lol/champion-splash-modified/${championUrlName}.jpg")`,
                  }}
                ></div>
                <div className="tft__champion-avatar__footer">
                  <div className="tft__champion-avatar__name">{name}</div>
                  <div className="tft__champion-avatar__cost">
                    {CHAMPIONS_MAP[name].tier}
                  </div>
                </div>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const ShopChampions = React.memo(ShopChampionsBase);

import React from 'react';
import { capitalize } from 'lodash-es';
import { useTftState } from '../../../state';

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
          <div key={index} className="tft__shop__champion-slot">
            {name && (
              <button
                className="tft__shop__champion-button"
                style={{
                  backgroundImage: `url("https://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/${championUrlName}.png")`,
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

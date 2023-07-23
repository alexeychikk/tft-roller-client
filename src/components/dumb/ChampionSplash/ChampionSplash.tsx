import React from 'react';
import { capitalize } from 'lodash-es';
import clsx from 'clsx';

import './ChampionSplash.styles.css';

export type ChampionSplashProps = {
  name: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'name'>;

const ChampionSplashBase: React.FC<ChampionSplashProps> = (props) => {
  const { className, name, style, ...restProps } = props;
  const championUrlName = capitalize(props.name.replace(/[^a-zA-Z]/gim, ''));

  return (
    <div
      className={clsx('tft__champion-splash', className)}
      style={{
        backgroundImage: `url("https://cdn.lolchess.gg/images/lol/champion-splash-modified/${championUrlName}.jpg")`,
      }}
      {...restProps}
    ></div>
  );
};

export const ChampionSplash = React.memo(ChampionSplashBase);

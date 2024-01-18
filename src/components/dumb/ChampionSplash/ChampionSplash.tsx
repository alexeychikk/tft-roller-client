import React from 'react';
import capitalize from 'lodash-es/capitalize';
import clsx from 'clsx';

import styles from './ChampionSplash.module.scss';

export type ChampionSplashProps = {
  name: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'name'>;

const ChampionSplashBase: React.FC<ChampionSplashProps> = (props) => {
  const { className, name, style, ...restProps } = props;
  const championUrlName = capitalize(props.name.replace(/[^a-zA-Z]/gim, ''));

  return (
    <div
      className={clsx(styles.rootChampionSplash, className)}
      style={{
        backgroundImage: `url("https://cdn.lolchess.gg/images/lol/champion-splash-modified/${championUrlName}.jpg")`,
      }}
      {...restProps}
    />
  );
};

export const ChampionSplash = React.memo(ChampionSplashBase);

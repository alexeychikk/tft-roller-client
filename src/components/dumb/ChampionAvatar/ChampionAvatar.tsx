import React from 'react';
import clsx from 'clsx';

import { CHAMPIONS_MAP } from '@src/constants';

import { ChampionSplash } from '../ChampionSplash';

import './ChampionAvatar.styles.css';

export type ChampionAvatarProps = {
  name: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'name'>;

const ChampionAvatarBase: React.FC<ChampionAvatarProps> = (props) => {
  const { className, name, ...restProps } = props;
  const { tier } = CHAMPIONS_MAP[name];

  return (
    <button
      className={clsx(
        'tft__champion-avatar',
        `tft__champion-avatar_tier_${tier}`,
        className,
      )}
      {...restProps}
    >
      <ChampionSplash name={name} />
      <div className="tft__champion-avatar__footer">
        <div className="tft__champion-avatar__name">{props.name}</div>
        <div className="tft__champion-avatar__cost">{tier}</div>
      </div>
    </button>
  );
};

export const ChampionAvatar = React.memo(ChampionAvatarBase);

import React from 'react';
import { capitalize, times } from 'lodash-es';
import clsx from 'clsx';

import { CHAMPIONS_MAP } from '@src/constants';
import { ReactComponent as IconStar } from '@src/assets/icons/star.svg';

import './ChampionAvatar.styles.css';

export type ChampionAvatarProps = {
  name: string;
  stars?: number;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'name'>;

const ChampionAvatarBase: React.FC<ChampionAvatarProps> = (props) => {
  const { className, name, ...restProps } = props;
  const championUrlName = capitalize(props.name.replace(/[^a-zA-Z]/gim, ''));

  return (
    <button className={clsx('tft__champion-avatar', className)} {...restProps}>
      <div
        className="tft__champion-avatar__image"
        style={{
          backgroundImage: `url("https://cdn.lolchess.gg/images/lol/champion-splash-modified/${championUrlName}.jpg")`,
        }}
      ></div>
      <div className="tft__champion-avatar__footer">
        <div className="tft__champion-avatar__name">{props.name}</div>
        {!props.stars && (
          <div className="tft__champion-avatar__cost">
            {CHAMPIONS_MAP[props.name].tier}
          </div>
        )}
      </div>
      {!!props.stars && (
        <div className="tft__champion-avatar__stars">
          {times(props.stars, (i) => (
            <IconStar key={i} />
          ))}
        </div>
      )}
    </button>
  );
};

export const ChampionAvatar = React.memo(ChampionAvatarBase);

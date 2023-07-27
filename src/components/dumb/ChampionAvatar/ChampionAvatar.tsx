import React, { useCallback } from 'react';
import clsx from 'clsx';
import { useDrag } from 'react-dnd';

import { CHAMPIONS_MAP } from '@src/constants';
import { DndItemChampion, DndItemType } from '@src/state';

import { ChampionSplash } from '../ChampionSplash';

import './ChampionAvatar.styles.css';

export type ChampionAvatarProps = {
  className?: string;
  name: string;
  shopIndex: number;
  onClick: (shopIndex: number) => void;
};

const ChampionAvatarBase: React.FC<ChampionAvatarProps> = (props) => {
  const { tier } = CHAMPIONS_MAP[props.name];

  const [{ isDragging }, dragRef] = useDrag<
    DndItemChampion,
    unknown,
    { isDragging: boolean }
  >(
    () => ({
      type: DndItemType.Champion,
      item: {
        shopIndex: props.shopIndex,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [props.shopIndex],
  );

  const handleClick = useCallback(
    () => props.onClick(props.shopIndex),
    [props.onClick, props.shopIndex],
  );

  return (
    <button
      className={clsx(
        'tft__champion-avatar',
        `tft__champion-avatar_tier_${tier}`,
        isDragging && `tft__champion-avatar_is-dragging`,
        props.className,
      )}
      ref={dragRef}
      onClick={handleClick}
    >
      <ChampionSplash name={props.name} />
      <div className="tft__champion-avatar__footer">
        <div className="tft__champion-avatar__name">{props.name}</div>
        <div className="tft__champion-avatar__cost">{tier}</div>
      </div>
    </button>
  );
};

export const ChampionAvatar = React.memo(ChampionAvatarBase);

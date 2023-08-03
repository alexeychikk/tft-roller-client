import React, { useCallback } from 'react';
import clsx from 'clsx';
import { useDrag } from 'react-dnd';

import { CHAMPIONS_MAP } from '@src/constants';
import { DndItemChampion, DndItemType } from '@src/state';
import { ReactComponent as IconCoin } from '@src/assets/icons/common/coin.svg';

import { ChampionSplash } from '../ChampionSplash';

import styles from './ChampionAvatar.module.scss';

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
        styles.rootChampionAvatar,
        styles[`tier${tier}`],
        isDragging && styles.isDragging,
        props.className,
      )}
      ref={dragRef}
      onClick={handleClick}
    >
      <ChampionSplash className={styles.championSplash} name={props.name} />
      <div className={styles.footer}>
        <div className={styles.name}>{props.name}</div>
        <div className={styles.cost}>
          <IconCoin className={styles.iconCoin} />
          <span>{tier}</span>
        </div>
      </div>
    </button>
  );
};

export const ChampionAvatar = React.memo(ChampionAvatarBase);

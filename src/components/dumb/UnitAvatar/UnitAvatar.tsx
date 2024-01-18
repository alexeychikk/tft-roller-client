import React from 'react';
import times from 'lodash-es/times';
import clsx from 'clsx';
import { useDrag } from 'react-dnd';

import { CHAMPIONS_MAP } from '@tft-roller';
import { DndItemType, DndItemUnit, GridType } from '@src/state';
import { ReactComponent as IconStar } from '@src/assets/icons/common/star.svg';

import { ChampionSplash } from '../ChampionSplash';

import styles from './UnitAvatar.module.scss';

export type UnitAvatarProps = {
  className?: string;
  name: string;
  stars: number;
  gridType: GridType;
  x: number;
  y: number;
};

const UnitAvatarBase: React.FC<UnitAvatarProps> = (props) => {
  const champion = CHAMPIONS_MAP[props.name];

  const [{ isDragging }, dragRef] = useDrag<
    DndItemUnit,
    unknown,
    { isDragging: boolean }
  >(
    () => ({
      type: DndItemType.Unit,
      item: {
        gridType: props.gridType,
        coords: { x: props.x, y: props.y },
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [props.gridType, props.x, props.y],
  );

  return (
    <button
      className={clsx(
        styles.rootUnitAvatar,
        styles[`tier${champion.tier}`],
        isDragging && styles.isDragging,
        props.className,
      )}
      ref={dragRef}
      data-tft-component-type="UnitAvatar"
      data-tft-unit={`${props.gridType},${props.x},${props.y}`}
    >
      <ChampionSplash className={styles.championSplash} name={props.name} />

      <div className={styles.stars}>
        {times(props.stars, (i) => (
          <IconStar key={i} />
        ))}
      </div>
    </button>
  );
};

export const UnitAvatar = React.memo(UnitAvatarBase);

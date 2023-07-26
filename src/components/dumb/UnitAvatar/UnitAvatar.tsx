import React from 'react';
import { times } from 'lodash-es';
import clsx from 'clsx';
import { useDrag } from 'react-dnd';

import { CHAMPIONS_MAP } from '@src/constants';
import { DndItemTypes, DndItemUnit, GridType, Unit } from '@src/state';
import { ReactComponent as IconStar } from '@src/assets/icons/star.svg';

import { ChampionSplash } from '../ChampionSplash';

import './UnitAvatar.styles.css';

export type UnitAvatarProps = {
  className?: string;
  gridType: GridType;
  unit: Unit;
  x: number;
  y: number;
};

const UnitAvatarBase: React.FC<UnitAvatarProps> = (props) => {
  const champion = CHAMPIONS_MAP[props.unit.name];

  const [{ isDragging }, dragRef] = useDrag<
    DndItemUnit,
    unknown,
    { isDragging: boolean }
  >(
    () => ({
      type: DndItemTypes.Unit,
      item: {
        gridType: props.gridType,
        coords: { x: props.x, y: props.y },
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [props.gridType, props.unit, props.x, props.y],
  );

  return (
    <button
      className={clsx(
        'tft__unit-avatar',
        `tft__unit-avatar_tier_${champion.tier}`,
        isDragging && `tft__unit-avatar_is-dragging`,
        props.className,
      )}
      ref={dragRef}
    >
      <ChampionSplash name={props.unit.name} />

      <div className="tft__unit-avatar__stars">
        {times(props.unit.stars, (i) => (
          <IconStar key={i} />
        ))}
      </div>
    </button>
  );
};

export const UnitAvatar = React.memo(UnitAvatarBase);

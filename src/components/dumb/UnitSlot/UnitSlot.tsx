import React from 'react';
import clsx from 'clsx';
import { useDrop } from 'react-dnd';

import { DndItemTypes, DndItemUnit, UnitsGrid, useTftState } from '@src/state';

import './UnitSlot.styles.css';

export type UnitSlotProps = {
  className?: string;
  children?: React.ReactNode;
  grid: UnitsGrid;
  x: number;
  y: number;
};

const UnitSlotBase: React.FC<UnitSlotProps> = (props) => {
  const { moveChampion } = useTftState();

  const [{}, dropRef] = useDrop(
    {
      accept: DndItemTypes.Unit,
      drop: (item: DndItemUnit) => {
        moveChampion(item, {
          coords: { x: props.x, y: props.y },
          grid: props.grid,
        });
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    },
    [props.grid, props.x, props.y, moveChampion],
  );

  return (
    <div className={clsx('tft__unit-slot')} ref={dropRef}>
      {props.children}
    </div>
  );
};

export const UnitSlot = React.memo(UnitSlotBase);

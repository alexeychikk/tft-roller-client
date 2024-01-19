import { useDrop } from 'react-dnd';

import { DndItemType, DndItemUnit, tftStore } from '@src/state';
import { GridType, UnitContext } from '@tft-roller';

export const useUnitSlot = (gridType: GridType, x: number, y: number) => {
  const coords = { x, y };
  const dest: UnitContext = { gridType, coords };

  return useDrop(
    {
      accept: DndItemType.Unit,
      canDrop: (item: DndItemUnit) =>
        tftStore.me?.canMoveUnit(item, dest) || false,
      drop: (item: DndItemUnit) => tftStore.moveUnit(item, dest),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    },
    [gridType, x, y],
  );
};

import { useDrop } from 'react-dnd';

import {
  DndItemTypes,
  DndItemUnit,
  GridType,
  UnitContext,
  tftStore,
} from '@src/state';

export const useUnitSlot = (gridType: GridType, x: number, y: number) => {
  const coords = { x, y };
  const dest: UnitContext = { gridType, coords };

  return useDrop(
    {
      accept: DndItemTypes.Unit,
      canDrop: (item: DndItemUnit) => tftStore.canMoveUnit(item, dest),
      drop: (item: DndItemUnit) => tftStore.moveUnit(item, dest),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    },
    [gridType, x, y],
  );
};

import { useDrop } from 'react-dnd';
import { useTftState } from './TftContext';
import { DndItemTypes, DndItemUnit } from './dnd';
import { GridType, UnitContext } from './UnitsGrid';

export const useUnitSlot = (gridType: GridType, x: number, y: number) => {
  const { bench, table, level, canMoveUnit, moveUnit } = useTftState();
  const coords = { x, y };
  const dest: UnitContext = { gridType, coords };

  return useDrop(
    {
      accept: DndItemTypes.Unit,
      canDrop: (item: DndItemUnit) => canMoveUnit(item, dest),
      drop: (item: DndItemUnit) => moveUnit(item, dest),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    },
    [gridType, x, y, bench, table, level, canMoveUnit, moveUnit],
  );
};

import { useDrop } from 'react-dnd';
import { useTftState } from './TftContext';
import { DndItemTypes, DndItemUnit } from './dnd';
import { UnitsGrid } from './UnitsGrid';

export const useUnitSlot = (grid: UnitsGrid, x: number, y: number) => {
  const { moveChampion } = useTftState();

  return useDrop(
    {
      accept: DndItemTypes.Unit,
      drop: (item: DndItemUnit) => {
        moveChampion(item, {
          coords: { x, y },
          grid,
        });
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    },
    [grid, x, y, moveChampion],
  );
};

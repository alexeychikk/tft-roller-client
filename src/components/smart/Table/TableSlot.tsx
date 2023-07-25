import React from 'react';

import { useTftState, useUnitSlot } from '@src/state';
import { UnitAvatar } from '@src/components/dumb/UnitAvatar';

export type TableSlotProps = {
  x: number;
  y: number;
};

const TableSlotBase: React.FC<TableSlotProps> = ({ x, y }) => {
  const { table } = useTftState();
  const unit = table.getUnit({ x, y });
  const [{}, dropRef] = useUnitSlot(table, x, y);

  return (
    <div className="tft__table-slot" ref={dropRef}>
      {unit && <UnitAvatar grid={table} unit={unit} x={x} y={y} />}
    </div>
  );
};

export const TableSlot = React.memo(TableSlotBase);

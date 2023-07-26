import React from 'react';

import { GridType, useTftState, useUnitSlot } from '@src/state';
import { UnitAvatar } from '@src/components/dumb/UnitAvatar';

export type TableSlotProps = {
  x: number;
  y: number;
};

const TableSlotBase: React.FC<TableSlotProps> = ({ x, y }) => {
  const { table } = useTftState();
  const unit = table.getUnit({ x, y });
  const [, dropRef] = useUnitSlot(GridType.Table, x, y);

  return (
    <div className="tft__table-slot" ref={dropRef}>
      {unit && <UnitAvatar gridType={GridType.Table} unit={unit} x={x} y={y} />}
    </div>
  );
};

export const TableSlot = React.memo(TableSlotBase);

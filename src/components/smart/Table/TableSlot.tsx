import React from 'react';
import { observer } from 'mobx-react-lite';

import { GridType, tftStore } from '@src/state';
import { UnitAvatar } from '@src/components/dumb/UnitAvatar';
import { useUnitSlot } from '@src/components/hooks/useUnitSlot';

export type TableSlotProps = {
  x: number;
  y: number;
};

const TableSlotBase: React.FC<TableSlotProps> = ({ x, y }) => {
  const unit = tftStore.table.getUnit({ x, y });
  const [, dropRef] = useUnitSlot(GridType.Table, x, y);

  return (
    <div className="tft__table-slot" ref={dropRef}>
      {unit && (
        <UnitAvatar
          name={unit.name}
          stars={unit.stars}
          gridType={GridType.Table}
          x={x}
          y={y}
        />
      )}
    </div>
  );
};

export const TableSlot = observer(TableSlotBase);

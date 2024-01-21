import { observer } from 'mobx-react-lite';
import React from 'react';
import { GridType } from '@tft-roller';

import { UnitAvatar } from '@src/components/dumb/UnitAvatar';
import { useUnitSlot } from '@src/components/hooks/useUnitSlot';
import { tftStore } from '@src/state';

export type TableSlotProps = {
  className?: string;
  x: number;
  y: number;
};

const TableSlotBase: React.FC<TableSlotProps> = ({ className, x, y }) => {
  const unit = tftStore.viewedPlayer?.table.getUnit({ x, y });
  const [, dropRef] = useUnitSlot(GridType.Table, x, y);

  return (
    <div className={className} ref={dropRef}>
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

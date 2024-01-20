import React from 'react';
import { observer } from 'mobx-react-lite';
import { GridType } from '@tft-roller';

import { tftStore } from '@src/state';
import { UnitAvatar } from '@src/components/dumb/UnitAvatar';
import { useUnitSlot } from '@src/components/hooks/useUnitSlot';

export type BenchSlotProps = {
  className?: string;
  x: number;
  y: number;
};

const BenchSlotBase: React.FC<BenchSlotProps> = ({ className, x, y }) => {
  const unit = tftStore.viewedPlayer?.bench.getUnit({ x, y });
  const [, dropRef] = useUnitSlot(GridType.Bench, x, y);

  return (
    <div className={className} ref={dropRef}>
      {unit && (
        <UnitAvatar
          name={unit.name}
          stars={unit.stars}
          gridType={GridType.Bench}
          x={x}
          y={y}
        />
      )}
    </div>
  );
};

export const BenchSlot = observer(BenchSlotBase);

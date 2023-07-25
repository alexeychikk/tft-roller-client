import React from 'react';

import { useTftState, useUnitSlot } from '@src/state';
import { UnitAvatar } from '@src/components/dumb/UnitAvatar';

export type BenchSlotProps = {
  x: number;
  y: number;
};

const BenchSlotBase: React.FC<BenchSlotProps> = ({ x, y }) => {
  const { bench } = useTftState();
  const unit = bench.getUnit({ x, y });
  const [{}, dropRef] = useUnitSlot(bench, x, y);

  return (
    <div className="tft__bench-slot" ref={dropRef}>
      {unit && <UnitAvatar grid={bench} unit={unit} x={x} y={y} />}
    </div>
  );
};

export const BenchSlot = React.memo(BenchSlotBase);

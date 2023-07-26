import React from 'react';
import { observer } from 'mobx-react-lite';
import { useDrop } from 'react-dnd';

import { DndItemType, DndItemUnit, tftStore } from '@src/state';

import './SellOverlay.styles.css';

export type SellOverlayProps = {
  /* empty */
};

const SellOverlayBase: React.FC<SellOverlayProps> = () => {
  const [{ item }, dropRef] = useDrop({
    accept: DndItemType.Unit,
    drop: (item: DndItemUnit) => tftStore.sellUnit(item),
    collect: (monitor) => ({
      item:
        monitor.getItemType() === DndItemType.Unit
          ? (monitor.getItem() as DndItemUnit)
          : null,
    }),
  });

  return (
    <div className="tft__shop__sell-overlay" ref={dropRef}>
      <span>Sell for {item ? tftStore.getUnitCost(item) : 0} gold</span>
    </div>
  );
};

export const SellOverlay = observer(SellOverlayBase);

import { observer } from 'mobx-react-lite';
import React from 'react';
import { useDrop } from 'react-dnd';

import { ReactComponent as IconCoin } from '@src/assets/icons/common/coin.svg';
import type { DndItemUnit } from '@src/state';
import { DndItemType, tftStore } from '@src/state';

import styles from './SellOverlay.module.scss';

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
    <div className={styles.rootSellOverlay} ref={dropRef}>
      <span>Sell for</span> <IconCoin className={styles.iconCoin} />
      <span> {item ? tftStore.me?.getUnitCost(item) : 0}</span>
    </div>
  );
};

export const SellOverlay = observer(SellOverlayBase);

import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

import { DndItemChampion, DndItemType, tftStore } from '@src/state';

import './DragLayer.scss';

export type DragLayerProps = {
  /* empty */
};

const rootElement = document.getElementById('root')!;

const DragLayerBase: React.FC<DragLayerProps> = () => {
  const [{ itemType }, dropRef] = useDrop(
    {
      accept: DndItemType.Champion,
      drop: (item: DndItemChampion) => tftStore.buyChampion(item.shopIndex),
      collect: (monitor) => ({
        itemType: monitor.getItemType() as DndItemType | null,
      }),
    },
    [],
  );

  const className = clsx(
    'tft__drag-layer',
    itemType && `tft__drag-layer_dragging`,
    itemType && `tft__drag-layer_dragging_${itemType}`,
    tftStore.isViewingEnemy && `tft__is-viewing-enemy`,
  );

  useEffect(() => {
    rootElement.className = className;
  }, [className]);

  return (
    <>
      <div className="tft__champion-dropbox" ref={dropRef} />
    </>
  );
};

export const DragLayer = observer(DragLayerBase);

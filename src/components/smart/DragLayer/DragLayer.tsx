import React, { useEffect } from 'react';
import { useDragLayer } from 'react-dnd';
import clsx from 'clsx';

import { DndItemType } from '@src/state';

import './DragLayer.styles.css';

export type DragLayerProps = {
  /* empty */
};

const rootElement = document.getElementById('root')!;

const DragLayerBase: React.FC<DragLayerProps> = () => {
  const { itemType } = useDragLayer((monitor) => ({
    itemType: monitor.getItemType() as DndItemType | null,
  }));

  const className = clsx(
    'tft__drag-layer',
    itemType && `tft__drag-layer_dragging`,
    itemType && `tft__drag-layer_dragging_${itemType}`,
  );

  useEffect(() => {
    rootElement.className = className;
  }, [className]);

  return null;
};

export const DragLayer = React.memo(DragLayerBase);

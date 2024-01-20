import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import { useKeyPressEvent } from 'react-use';
import { GridType } from '@tft-roller';

import { tftStore } from '@src/state';
import { findParentElement } from '@src/utils';

export type InputListenerProps = {
  /* empty */
};

const InputListenerBase: React.FC<InputListenerProps> = () => {
  useKeyPressEvent((e) => e.code === 'KeyD', null, tftStore.reroll);
  useKeyPressEvent((e) => e.code === 'KeyF', null, tftStore.buyExperience);

  const mouseCoords = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      mouseCoords.current.x = event.clientX;
      mouseCoords.current.y = event.clientY;
    };
    document.addEventListener('mousemove', handler);

    return () => document.removeEventListener('mousemove', handler);
  });

  useKeyPressEvent(
    (e) => e.code === 'KeyE',
    null,
    () => {
      const element = document.elementFromPoint(
        mouseCoords.current.x,
        mouseCoords.current.y,
      );

      const target = findParentElement(
        element,
        (el) => el.dataset.tftComponentType === 'UnitAvatar',
      );

      if (!target) return;
      const [gridType, x, y] = target.dataset.tftUnit!.split(',');
      tftStore.sellUnit({
        gridType: gridType as GridType,
        coords: { x: +x, y: +y },
      });
    },
  );

  return null;
};

export const InputListener = observer(InputListenerBase);

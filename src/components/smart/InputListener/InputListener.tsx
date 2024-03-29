import { observer } from 'mobx-react-lite';
import type React from 'react';
import { useEffect, useRef } from 'react';
import { useKeyPressEvent } from 'react-use';
import type { GridType } from '@tft-roller';

import { useTftStore } from '@src/state';
import { findParentElement } from '@src/utils';

export type InputListenerProps = {
  /* empty */
};

const InputListenerBase: React.FC<InputListenerProps> = () => {
  const tftStore = useTftStore();

  useKeyPressEvent((e) => e.code === 'KeyD', null, tftStore.reroll);
  useKeyPressEvent((e) => e.code === 'KeyF', null, tftStore.buyExperience);
  useKeyPressEvent((e) => e.code === 'Digit1', null, tftStore.viewPrevPlayer);
  useKeyPressEvent((e) => e.code === 'Digit3', null, tftStore.viewNextPlayer);

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

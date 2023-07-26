import { observer } from 'mobx-react-lite';
import React from 'react';
import { useKeyPressEvent } from 'react-use';

import { tftStore } from '@src/state';

export type InputListenerProps = {
  /* empty */
};

const InputListenerBase: React.FC<InputListenerProps> = () => {
  useKeyPressEvent('d', null, tftStore.reroll);
  useKeyPressEvent('f', null, tftStore.buyExperience);
  return null;
};

export const InputListener = observer(InputListenerBase);

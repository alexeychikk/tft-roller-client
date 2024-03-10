import { useState } from 'react';

import { TftStore } from '../stores/TftStore';

import { TftContext } from './context';

export const TftProvider: React.FC<{ children?: React.ReactNode }> = (
  props,
) => {
  const [store] = useState<TftStore>(new TftStore());

  return (
    <TftContext.Provider value={store}>{props.children}</TftContext.Provider>
  );
};

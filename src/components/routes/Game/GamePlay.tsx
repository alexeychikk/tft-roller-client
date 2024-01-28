import React from 'react';

import { Bench } from '@src/components/smart/Bench';
import { Comps } from '@src/components/smart/Comps';
import { DragLayer } from '@src/components/smart/DragLayer';
import { InputListener } from '@src/components/smart/InputListener';
import { PlayersList } from '@src/components/smart/PlayersList';
import { Shop } from '@src/components/smart/Shop';
import { Table } from '@src/components/smart/Table';

export const GamePlay = React.memo(() => {
  return (
    <>
      <InputListener />
      <Table />
      <Bench />
      <Shop />
      <Comps />
      <PlayersList />
      <DragLayer />
    </>
  );
});

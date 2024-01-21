import { makeObservable, observable } from 'mobx';
import type { UnitsGridSchema } from '@tft-roller';
import { UnitsGrid } from '@tft-roller';

import { listenMap } from '@src/utils';

import { UnitStore } from './UnitStore';

export class UnitsGridStore extends UnitsGrid {
  constructor(grid: UnitsGridSchema) {
    super({ ...grid, slots: new Map(grid.slots) });
    makeObservable(this, {
      slots: observable,
    });
    listenMap(grid, this, 'slots', (unit) => new UnitStore(unit));
  }
}

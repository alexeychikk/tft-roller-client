import { makeObservable, observable } from 'mobx';
import type { SchemaOf } from '@tft-roller';
import { UnitsGrid } from '@tft-roller';

import { listenMap } from '@src/utils';

import { UnitStore } from './UnitStore';

export class UnitsGridStore extends UnitsGrid {
  constructor(grid: SchemaOf<UnitsGrid>) {
    super();
    Object.assign(this, grid, { slots: new Map(grid.slots) });
    makeObservable(this, {
      slots: observable,
    });
    listenMap(grid, this, 'slots', (unit) => new UnitStore(unit));
  }
}

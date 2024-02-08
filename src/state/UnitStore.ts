import { makeObservable, observable } from 'mobx';
import type { SchemaOf } from '@tft-roller';
import { Unit } from '@tft-roller';

import { listenPrimitive } from '@src/utils';

export class UnitStore extends Unit {
  constructor(unit: SchemaOf<Unit>) {
    super();
    Object.assign(this, unit);
    makeObservable(this, {
      name: observable,
      stars: observable,
    });
    listenPrimitive(unit, this, 'stars');
  }
}

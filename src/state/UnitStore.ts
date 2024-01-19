import { makeObservable, observable } from 'mobx';
import { Unit, UnitSchema } from '@tft-roller';
import { listenPrimitive } from '@src/utils';

export class UnitStore extends Unit {
  constructor(unit: UnitSchema) {
    super({ ...unit });
    makeObservable(this, {
      name: observable,
      stars: observable,
    });
    listenPrimitive(unit, this, 'stars');
  }
}

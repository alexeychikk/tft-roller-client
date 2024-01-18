import { action, computed, makeObservable, observable } from 'mobx';
import { CHAMPIONS_MAP } from '@tft-roller';

export class Unit {
  name: string;
  stars: number;

  constructor(options: { name: string; stars: number }) {
    this.name = options.name;
    this.stars = options.stars;
    makeObservable(this, {
      stars: observable,
      sellCost: computed,
      upgrade: action,
    });
  }

  get sellCost(): number {
    const champion = CHAMPIONS_MAP[this.name];
    const gold = champion.tier * Math.pow(3, this.stars - 1);
    return champion.tier === 1 || this.stars === 1 ? gold : gold - 1;
  }

  upgrade() {
    this.stars++;
  }
}

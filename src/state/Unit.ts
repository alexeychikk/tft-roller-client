import { action, makeObservable, observable } from 'mobx';

export class Unit {
  name: string;
  stars: number;

  constructor(options: { name: string; stars: number }) {
    this.name = options.name;
    this.stars = options.stars;
    makeObservable(this, { stars: observable, upgrade: action });
  }

  upgrade() {
    this.stars++;
  }
}

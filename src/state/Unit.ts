export class Unit {
  readonly name: string;
  readonly stars: number;

  constructor(options: { name: string; stars: number }) {
    this.name = options.name;
    this.stars = options.stars;
  }

  upgrade(): Unit {
    return new Unit({ name: this.name, stars: this.stars + 1 });
  }
}

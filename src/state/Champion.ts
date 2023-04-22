export class Champion {
  type: string;
  stars: number;

  constructor(options: { type: string; stars: number }) {
    this.type = options.type;
    this.stars = options.stars;
  }
}

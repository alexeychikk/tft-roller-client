import { times } from 'lodash-es';
import { Champion } from './Champion';

export type Coords = { x: number; y: number };

export class ChampionsGrid {
  readonly width: number;
  readonly height: number;

  /**
   * [
   *  [0,0,0,0,0,0,0],
   *  [0,0,0,0,0,0,0],
   *  [0,0,0,0,0,0,0],
   *  [0,0,0,0,0,0,0],
   * ]
   */
  private champions: (Champion | undefined)[][];

  constructor(options: { width: number; height: number }) {
    this.width = options.width;
    this.height = options.height;
    this.champions = times(this.height, () =>
      times(this.width, () => undefined),
    );
  }

  getChampion(coords: Coords): Champion | undefined {
    return this.champions[coords.y][coords.x];
  }

  setChampion(coords: Coords, champion: Champion | undefined) {
    this.champions = this.champions.slice();
    this.champions[coords.y] = this.champions[coords.y].slice();
    this.champions[coords.y][coords.x] = champion;
  }

  moveChampion(from: Coords, to: Coords) {
    const fromChampion = this.getChampion(from);
    if (!fromChampion) return;

    const toChampion = this.getChampion(to);
    this.setChampion(to, fromChampion);

    if (toChampion) {
      this.setChampion(from, toChampion);
    } else {
      this.setChampion(from, undefined);
    }
  }
}

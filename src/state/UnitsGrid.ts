import { times } from 'lodash-es';
import { Unit } from './Unit';

export type Coords = { x: number; y: number };

export class UnitsGrid {
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
  private units: (Unit | undefined)[][];

  constructor(options: { width: number; height: number }) {
    this.width = options.width;
    this.height = options.height;
    this.units = times(this.height, () => times(this.width, () => undefined));
  }

  getUnit(coords: Coords): Unit | undefined {
    return this.units[coords.y][coords.x];
  }

  setUnit(coords: Coords, unit: Unit | undefined) {
    this.units = this.units.slice();
    this.units[coords.y] = this.units[coords.y].slice();
    this.units[coords.y][coords.x] = unit;
  }

  moveUnit(from: Coords, to: Coords) {
    const fromUnit = this.getUnit(from);
    if (!fromUnit) return;

    const toUnit = this.getUnit(to);
    this.setUnit(to, fromUnit);

    if (toUnit) {
      this.setUnit(from, toUnit);
    } else {
      this.setUnit(from, undefined);
    }
  }
}

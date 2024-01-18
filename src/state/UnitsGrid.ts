import { times } from 'remeda';
import { action, computed, makeObservable, observable } from 'mobx';
import { Unit } from './Unit';

export type Coords = { x: number; y: number };

export enum GridType {
  Bench = 'bench',
  Table = 'table',
}

export type UnitContext = { gridType: GridType; coords: Coords };

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
  protected slots: (Unit | undefined)[][];

  constructor(options: {
    width: number;
    height: number;
    slots?: (Unit | undefined)[][];
  }) {
    this.width = options.width;
    this.height = options.height;
    this.slots =
      options.slots ??
      times(this.height, () => times(this.width, () => undefined));

    makeObservable<UnitsGrid, 'slots'>(this, {
      slots: observable,
      isFull: computed,
      units: computed,
      firstEmptySlot: computed,
      setUnit: action,
      moveUnit: action,
      removeUnits: action,
      upgradeUnit: action,
    });
  }

  get isFull(): boolean {
    return !this.firstEmptySlot;
  }

  get units(): Unit[] {
    const res: Unit[] = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.slots[y][x] !== undefined) res.push(this.slots[y][x]!);
      }
    }
    return res;
  }

  get firstEmptySlot(): Coords | undefined {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.slots[y][x] === undefined) return { x, y };
      }
    }
  }

  getUnit(coords: Coords): Unit | undefined {
    return this.slots[coords.y][coords.x];
  }

  setUnit(coords: Coords, unit: Unit | undefined): UnitsGrid {
    this.slots[coords.y][coords.x] = unit;
    return this;
  }

  moveUnit(from: Coords, to: Coords): UnitsGrid {
    const fromUnit = this.getUnit(from);
    if (!fromUnit) return this;

    const toUnit = this.getUnit(to);
    this.setUnit(to, fromUnit);
    this.setUnit(from, toUnit);
    return this;
  }

  upgradeUnit(coords: Coords): UnitsGrid {
    const unit = this.getUnit(coords);
    if (!unit) {
      throw new Error(`Unit at coords ${coords.x},${coords.y} does not exist!`);
    }
    unit.upgrade();
    return this;
  }

  removeUnits(coords: Coords[]): UnitsGrid {
    for (const coord of coords) {
      this.setUnit(coord, undefined);
    }
    return this;
  }

  getCoordsOfUnitsOfStars(
    name: string,
    numUnits: number,
    stars: number,
  ): Coords[] {
    const coords: Coords[] = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (
          this.slots[y][x]?.name !== name ||
          this.slots[y][x]?.stars !== stars
        ) {
          continue;
        }
        coords.push({ x, y });
        if (coords.length === numUnits) {
          return coords;
        }
      }
    }

    return coords;
  }
}

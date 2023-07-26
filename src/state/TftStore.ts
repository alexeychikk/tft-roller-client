import { mapValues, pickBy, sumBy, times } from 'lodash-es';
import { action, computed, makeObservable, observable } from 'mobx';

import {
  CHAMPIONS_MAP,
  CHAMPIONS_POOL,
  EXPERIENCE_PER_BUY,
  EXPERIENCE_PER_LEVEL,
  GOLD_PER_EXPERIENCE_BUY,
  GOLD_PER_REROLL,
  MAX_LEVEL,
  MIN_LEVEL,
  REROLL_CHANCES,
  SHOP_SIZE,
} from '@src/constants';
import { weightedRandom } from '@src/utils';

import { Unit } from './Unit';
import { GridType, UnitContext, UnitsGrid } from './UnitsGrid';

export class TftStore {
  gold = 300;
  experience = 2;
  shopChampionNames: (string | undefined)[] = new Array(SHOP_SIZE).fill(
    undefined,
  );
  shopChampionPool: Record<string, number> = CHAMPIONS_POOL;
  bench = new UnitsGrid({ height: 1, width: 9 });
  table = new UnitsGrid({ height: 4, width: 7 });

  constructor() {
    makeObservable(this, {
      gold: observable,
      experience: observable,
      shopChampionNames: observable,
      shopChampionPool: observable,
      bench: observable,
      table: observable,

      isEnoughGoldToBuyExperience: computed,
      isEnoughGoldToReroll: computed,
      isMaxLevelReached: computed,
      level: computed,
      levelAbove: computed,
      rerollChances: computed,

      buyExperience: action.bound,
      buyChampion: action.bound,
      sellUnit: action.bound,
      moveUnit: action.bound,
      reroll: action.bound,
    });

    this.bench
      .setUnit({ x: 0, y: 0 }, new Unit({ name: 'Cassiopeia', stars: 1 }))
      .setUnit({ x: 1, y: 0 }, new Unit({ name: 'Cassiopeia', stars: 1 }))
      .setUnit({ x: 2, y: 0 }, new Unit({ name: 'Zed', stars: 1 }))
      .setUnit({ x: 3, y: 0 }, new Unit({ name: 'Zed', stars: 1 }))
      .setUnit({ x: 4, y: 0 }, new Unit({ name: 'Maokai', stars: 1 }))
      .setUnit({ x: 5, y: 0 }, new Unit({ name: 'Maokai', stars: 1 }))
      .setUnit({ x: 6, y: 0 }, new Unit({ name: 'Poppy', stars: 1 }))
      .setUnit({ x: 7, y: 0 }, new Unit({ name: 'Poppy', stars: 1 }))
      .setUnit({ x: 8, y: 0 }, new Unit({ name: 'Tristana', stars: 1 }));

    this.shopChampionNames = [
      'Cassiopeia',
      'Tristana',
      'Tristana',
      'Maokai',
      'Maokai',
    ];
  }

  get isEnoughGoldToBuyExperience() {
    return this.gold >= GOLD_PER_EXPERIENCE_BUY;
  }

  get isEnoughGoldToReroll() {
    return this.gold >= GOLD_PER_REROLL;
  }

  get isMaxLevelReached() {
    return this.experience >= EXPERIENCE_PER_LEVEL[MAX_LEVEL];
  }

  get levelAbove() {
    const levelAboveName = Object.keys(EXPERIENCE_PER_LEVEL).find((level) => {
      const exp = EXPERIENCE_PER_LEVEL[+level];
      return this.experience < exp;
    });
    return levelAboveName ? +levelAboveName : undefined;
  }

  get level() {
    return Math.max(
      this.levelAbove !== undefined ? this.levelAbove - 1 : MAX_LEVEL,
      MIN_LEVEL,
    );
  }

  get rerollChances() {
    return REROLL_CHANCES[this.level];
  }

  buyExperience() {
    if (!this.isEnoughGoldToBuyExperience) return;
    if (this.isMaxLevelReached) return;
    this.experience += EXPERIENCE_PER_BUY;
    this.gold -= GOLD_PER_EXPERIENCE_BUY;
  }

  buyChampion(index: number) {
    const championName = this.shopChampionNames[index];
    if (championName === undefined) return;

    const champion = CHAMPIONS_MAP[championName];
    if (this.gold < champion.tier) return;

    if (!this.bench.firstEmptySlot) {
      const benchUnitsCoords = this.bench.getCoordsOfUnitsOfStars(
        championName,
        2,
        1,
      );
      const tableUnitsCoords = this.table.getCoordsOfUnitsOfStars(
        championName,
        2,
        1,
      );
      if (!benchUnitsCoords.length && !tableUnitsCoords.length) {
        return;
      }

      const shopChampionIndexes = [
        index,
        ...this.shopChampionNames
          .map((name, i) => (name === championName ? i : -1))
          .filter((i) => i !== -1 && i !== index),
      ];
      const amountToBuy =
        3 - (benchUnitsCoords.length + tableUnitsCoords.length);
      if (shopChampionIndexes.length < amountToBuy) {
        return;
      }
      if (this.gold < amountToBuy * champion.tier) {
        return;
      }

      times(amountToBuy, (i) => {
        this.shopChampionNames[shopChampionIndexes[i]] = undefined;
      });
      this.gold -= amountToBuy * champion.tier;
      this.mergeUnits({ championName, minUnitsAmount: 1 });
      return;
    }

    this.shopChampionNames[index] = undefined;
    this.bench.setUnit(
      this.bench.firstEmptySlot,
      new Unit({ name: championName, stars: 1 }),
    );
    this.gold -= champion.tier;
    this.mergeUnits({ championName });
  }

  sellUnit({ coords, gridType }: UnitContext) {
    const unit = this[gridType].getUnit(coords);
    if (!unit) return;
    this[gridType].setUnit(coords, undefined);
    this.shopChampionPool[unit.name]++;
    this.gold += unit.sellCost;
  }

  getUnitCost({ coords, gridType }: UnitContext) {
    return this[gridType].getUnit(coords)?.sellCost || 0;
  }

  canMoveUnit(source: UnitContext, dest: UnitContext): boolean {
    const unitFrom = this[source.gridType].getUnit(source.coords);
    if (!unitFrom) return false;

    const unitTo = this[dest.gridType].getUnit(dest.coords);

    if (
      source.gridType === GridType.Bench &&
      dest.gridType === GridType.Table &&
      !unitTo &&
      this.table.units.length >= this.level
    ) {
      return false;
    }

    return true;
  }

  moveUnit(source: UnitContext, dest: UnitContext) {
    if (!this.canMoveUnit(source, dest)) return;

    const sourceGrid = this[source.gridType];
    const destGrid = this[dest.gridType];
    const unitFrom = sourceGrid.getUnit(source.coords);
    const unitTo = destGrid.getUnit(dest.coords);

    if (source.gridType === dest.gridType) {
      sourceGrid.setUnit(source.coords, unitTo).setUnit(dest.coords, unitFrom);
    } else {
      sourceGrid.setUnit(source.coords, unitTo);
      destGrid.setUnit(dest.coords, unitFrom);
    }
  }

  reroll() {
    if (!this.isEnoughGoldToReroll) return;

    this.shopChampionNames.forEach((name) => {
      if (name === undefined) return;
      this.shopChampionPool[name]++;
    });
    this.rerollShop();
    this.gold -= GOLD_PER_REROLL;
  }

  protected rerollShop() {
    times(this.shopChampionNames.length, (index) => this.rerollShopSlot(index));
  }

  protected rerollShopSlot(index: number) {
    const poolByTier: Record<
      number,
      { pool: Record<string, number>; total: number }
    > = {};

    const tierSpec = this.rerollChances.reduce((result, probability, index) => {
      if (probability <= 0) return result;

      const tier = index + 1;
      const pool = pickBy(
        this.shopChampionPool,
        (_, name) => CHAMPIONS_MAP[name].tier === tier,
      );
      const total = sumBy(Object.keys(pool), (name) => pool[name]);

      if (total <= 0) return result;

      poolByTier[tier] = { pool, total };
      result[tier] = probability;
      return result;
    }, {} as Record<number, number>);

    const tier = +weightedRandom(tierSpec);

    const tierPool = poolByTier[tier].pool;
    const totalTierPoolSize = poolByTier[tier].total;

    const champSpec = mapValues(
      pickBy(tierPool, (pool) => pool > 0),
      (size) => size / totalTierPoolSize,
    );
    const championName = weightedRandom(champSpec);

    this.shopChampionNames[index] = championName;
    this.shopChampionPool[championName]--;
  }

  protected mergeUnits({
    championName,
    stars = 1,
    minUnitsAmount = 3,
  }: {
    championName: string;
    stars?: number;
    minUnitsAmount?: number;
  }) {
    const benchCoords = this.bench.getCoordsOfUnitsOfStars(
      championName,
      3,
      stars,
    );
    const tableCoords = this.table.getCoordsOfUnitsOfStars(
      championName,
      3,
      stars,
    );
    if (benchCoords.length + tableCoords.length < minUnitsAmount) {
      return;
    }

    if (tableCoords.length) {
      const [firstUnitCoords, ...restCoords] = tableCoords;
      this.bench.removeUnits(benchCoords);
      this.table.removeUnits(restCoords).upgradeUnit(firstUnitCoords);
    } else {
      const [firstUnitCoords, ...restCoords] = benchCoords;
      this.table.removeUnits(tableCoords);
      this.bench.removeUnits(restCoords).upgradeUnit(firstUnitCoords);
    }

    this.mergeUnits({ championName, stars: stars + 1 });
  }
}

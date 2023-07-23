import { pickBy, noop, sumBy, mapValues, times } from 'lodash-es';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useKeyPressEvent } from 'react-use';
import {
  EXPERIENCE_PER_BUY,
  EXPERIENCE_PER_LEVEL,
  GOLD_PER_EXPERIENCE_BUY,
  MAX_LEVEL,
  MIN_LEVEL,
  REROLL_CHANCES,
  CHAMPIONS_MAP,
  CHAMPIONS_POOL,
  GOLD_PER_REROLL,
  SHOP_SIZE,
} from '@src/constants';
import { weightedRandom } from '@src/utils';
import { Unit } from './Unit';
import { Coords, UnitContext, UnitsGrid } from './UnitsGrid';

export type TftContextType = {
  gold: number;
  experience: number;
  shopChampionNames: (string | undefined)[];
  shopChampionPool: Record<string, number>;
  bench: UnitsGrid;
  table: UnitsGrid;
  level: number;
  levelAbove?: number;
  rerollChances: number[];
  isEnoughGoldToBuyExperience: boolean;
  isEnoughGoldToReroll: boolean;
  isMaxLevelReached: boolean;
  buyExperience: () => void;
  buyChampion: (index: number) => void;
  sellChampion: (grid: UnitsGrid, coords: Coords) => void;
  moveChampion: (source: UnitContext, dest: UnitContext) => void;
  reroll: () => void;
};

export const TftContext = React.createContext<TftContextType>({
  gold: 0,
  experience: 0,
  shopChampionNames: [],
  shopChampionPool: {},
  bench: new UnitsGrid({ height: 0, width: 0 }),
  table: new UnitsGrid({ height: 0, width: 0 }),
  level: 0,
  rerollChances: [],
  isEnoughGoldToBuyExperience: false,
  isEnoughGoldToReroll: false,
  isMaxLevelReached: false,
  buyExperience: noop,
  buyChampion: noop,
  sellChampion: noop,
  moveChampion: noop,
  reroll: noop,
});

export type TftProviderProps = {
  children: React.ReactNode;
};

export const TftProvider: React.FC<TftProviderProps> = (props) => {
  const [gold, setGold] = useState(300);
  const [experience, setExperience] = useState(2);
  const [bench, setBench] = useState(new UnitsGrid({ height: 1, width: 9 }));
  const [table, setTable] = useState(new UnitsGrid({ height: 4, width: 7 }));

  const isEnoughGoldToBuyExperience = gold >= GOLD_PER_EXPERIENCE_BUY;
  const isEnoughGoldToReroll = gold >= GOLD_PER_REROLL;
  const isMaxLevelReached = experience >= EXPERIENCE_PER_LEVEL[MAX_LEVEL];

  const levelAboveName = Object.keys(EXPERIENCE_PER_LEVEL).find((level) => {
    const exp = EXPERIENCE_PER_LEVEL[+level];
    return experience < exp;
  });
  const levelAbove = levelAboveName ? +levelAboveName : undefined;
  const level = Math.max(
    levelAbove !== undefined ? levelAbove - 1 : MAX_LEVEL,
    MIN_LEVEL,
  );
  const rerollChances = REROLL_CHANCES[level];

  const [shopChampionPool, setShopChampionPool] =
    useState<Record<string, number>>(CHAMPIONS_POOL);

  const [shopChampionNames, setShopChampionNames] = useState<
    (string | undefined)[]
  >(new Array(SHOP_SIZE).fill(undefined));

  function rerollShop(
    rerollChancesLocal: typeof rerollChances,
    shopChampionNamesLocal: typeof shopChampionNames,
    shopChampionPoolLocal: typeof shopChampionPool,
  ) {
    let newChampionPool = { ...shopChampionPoolLocal };
    times(shopChampionNamesLocal.length, (index) => {
      const poolByTier: Record<
        number,
        { pool: Record<string, number>; total: number }
      > = {};

      const tierSpec = rerollChancesLocal.reduce(
        (result, probability, index) => {
          if (probability <= 0) return result;

          const tier = index + 1;
          const pool = pickBy(
            newChampionPool,
            (_, name) => CHAMPIONS_MAP[name].tier === tier,
          );
          const total = sumBy(Object.keys(pool), (name) => pool[name]);

          if (total <= 0) return result;

          poolByTier[tier] = { pool, total };
          result[tier] = probability;
          return result;
        },
        {} as Record<number, number>,
      );

      const tier = +weightedRandom(tierSpec);

      const tierPool = poolByTier[tier].pool;
      const totalTierPoolSize = poolByTier[tier].total;

      const champSpec = mapValues(
        pickBy(tierPool, (pool) => pool > 0),
        (size) => size / totalTierPoolSize,
      );
      const championName = weightedRandom(champSpec);

      newChampionPool = {
        ...newChampionPool,
        [championName]: newChampionPool[championName] - 1,
      };
      setShopChampionPool(newChampionPool);
      setShopChampionNames((names) => {
        const newNames = [...names];
        newNames[index] = championName;
        return newNames;
      });
    });
  }

  function mergeUnits(
    localBench: UnitsGrid,
    championName: string,
    stars = 1,
  ): UnitsGrid {
    const coords = localBench.getCoordsOfUnitsOfStars(championName, 3, stars);
    if (coords.length !== 3) return localBench;
    const [firstUnitCoords, ...restCoords] = coords;
    localBench = localBench.removeUnits(restCoords);
    localBench = localBench.upgradeUnit(firstUnitCoords);
    return mergeUnits(localBench, championName, stars + 1);
  }

  useEffect(() => {
    rerollShop(rerollChances, shopChampionNames, shopChampionPool);
  }, []);

  const buyExperience = useCallback(() => {
    if (!isEnoughGoldToBuyExperience) return;
    if (isMaxLevelReached) return;
    setExperience((exp) => exp + EXPERIENCE_PER_BUY);
    setGold((g) => g - GOLD_PER_EXPERIENCE_BUY);
  }, [isEnoughGoldToBuyExperience, isMaxLevelReached]);

  const buyChampion = useCallback(
    (index: number) => {
      const championName = shopChampionNames[index];
      if (championName === undefined) return;

      const champion = CHAMPIONS_MAP[championName];
      if (gold < champion.tier) return;

      const emptySlot = bench.getFirstEmptySlot();
      if (!emptySlot) {
        // 1. Взять массив координат юнитов с таким именем на доске
        // 2. Если пустой массив - выходим
        // 3. Посчитать количество чемпиона в магазине amount_in_shop
        //    amount_to_buy = 3 - amount_on_bench
        // 4. Если amount_in_shop < amount_to_buy - выход
        // 5. Если не хватает золота на amount_to_buy - выход
        // 6. Потратить золота на amount_to_buy юнитов
        // 7. Апгрейдим первый юнит и удаляем остальные, рекурсия
        // 8. Удалить amount_to_buy чемпов из магаза
        return;
      }

      setBench((b) =>
        b.setUnit(emptySlot, new Unit({ name: championName, stars: 1 })),
      );
      setGold((g) => g - champion.tier);
      setShopChampionNames((champNames) => {
        const res = [...champNames];
        res[index] = undefined;
        return res;
      });
      setBench((b) => mergeUnits(b, championName));
    },
    [shopChampionNames, gold, bench],
  );

  const updateGrid = useCallback(
    (grid: UnitsGrid, updateFn: (g: UnitsGrid) => UnitsGrid) => {
      if (grid === bench) {
        setBench(updateFn);
      } else if (grid === table) {
        setTable(updateFn);
      } else {
        throw new Error('Grid is not bench nor table');
      }
    },
    [bench, table],
  );

  const sellChampion = useCallback(
    (grid: UnitsGrid, coords: Coords) => {
      const unit = grid.getUnit(coords);
      if (!unit) return;
      const champion = CHAMPIONS_MAP[unit.name];
      updateGrid(grid, (g) => g.setUnit(coords, undefined));
      setShopChampionPool((p) => ({ ...p, [unit.name]: p[unit.name] + 1 }));
      setGold((g) => {
        const newGold = g + champion.tier * Math.pow(3, unit.stars - 1);
        if (champion.tier === 1 || unit.stars === 1) return newGold;
        return newGold - 1;
      });
    },
    [updateGrid],
  );

  const moveChampion = useCallback(
    (source: UnitContext, dest: UnitContext) => {
      const unitFrom = source.grid.getUnit(source.coords);
      if (!unitFrom) return;
      const unitTo = dest.grid.getUnit(dest.coords);
      updateGrid(source.grid, (g) => g.setUnit(source.coords, unitTo));
      updateGrid(dest.grid, (g) => g.setUnit(dest.coords, unitFrom));
    },
    [updateGrid],
  );

  const reroll = useCallback(() => {
    if (!isEnoughGoldToReroll) return;

    let newPool = { ...shopChampionPool };
    shopChampionNames.forEach((name) => {
      if (name === undefined) return;
      newPool = { ...newPool, [name]: newPool[name] + 1 };
      setShopChampionPool(newPool);
    });

    rerollShop(rerollChances, shopChampionNames, newPool);
    setGold((g) => g - GOLD_PER_REROLL);
  }, [
    isEnoughGoldToReroll,
    rerollChances,
    shopChampionNames,
    shopChampionPool,
  ]);

  useKeyPressEvent('d', null, reroll);
  useKeyPressEvent('f', null, buyExperience);

  const value = useMemo(
    (): TftContextType => ({
      gold,
      experience,
      shopChampionNames,
      shopChampionPool,
      bench,
      table,
      level,
      levelAbove,
      rerollChances,
      isEnoughGoldToBuyExperience,
      isEnoughGoldToReroll,
      isMaxLevelReached,
      buyExperience,
      buyChampion,
      sellChampion,
      moveChampion,
      reroll,
    }),
    [gold, experience, shopChampionNames, shopChampionPool, bench, table],
  );

  return (
    <TftContext.Provider value={value}>{props.children}</TftContext.Provider>
  );
};

export const useTftState = () => useContext(TftContext);

import { noop, times } from 'lodash-es';
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
  GOLD_PER_EXPERIENCE_BUY,
  CHAMPIONS_MAP,
  CHAMPIONS_POOL,
  GOLD_PER_REROLL,
  SHOP_SIZE,
} from '@src/constants';

import { Unit } from './Unit';
import { GridType, UnitContext, UnitsGrid } from './UnitsGrid';
import { getComputedState } from './computed';
import { mergeUnits, rerollShop } from './actions';

export type TftContextState = {
  gold: number;
  experience: number;
  shopChampionNames: (string | undefined)[];
  shopChampionPool: Record<string, number>;
  bench: UnitsGrid;
  table: UnitsGrid;
};

export type TftContextComputed = {
  level: number;
  levelAbove?: number;
  rerollChances: number[];
  isEnoughGoldToBuyExperience: boolean;
  isEnoughGoldToReroll: boolean;
  isMaxLevelReached: boolean;
};

export type TftContextActions = {
  buyExperience: () => void;
  buyChampion: (index: number) => void;
  sellChampion: (unitContext: UnitContext) => void;
  canMoveUnit: (source: UnitContext, dest: UnitContext) => boolean;
  moveUnit: (source: UnitContext, dest: UnitContext) => void;
  reroll: () => void;
};

export type TftContextType = TftContextState &
  TftContextComputed &
  TftContextActions;

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
  moveUnit: noop,
  canMoveUnit: () => false,
  reroll: noop,
});

export type TftProviderProps = {
  children: React.ReactNode;
};

export const TftProvider: React.FC<TftProviderProps> = (props) => {
  const [state, setState] = useState<TftContextState>({
    gold: 300,
    experience: 2,
    bench: new UnitsGrid({ height: 1, width: 9 }),
    table: new UnitsGrid({ height: 4, width: 7 }),
    shopChampionNames: new Array(SHOP_SIZE).fill(undefined),
    shopChampionPool: CHAMPIONS_POOL,
  });

  const computed = getComputedState(state);

  useEffect(() => {
    setState((state) => ({
      ...state,
      bench: state.bench
        .setUnit({ x: 0, y: 0 }, new Unit({ name: 'Cassiopeia', stars: 1 }))
        .setUnit({ x: 1, y: 0 }, new Unit({ name: 'Cassiopeia', stars: 1 }))
        .setUnit({ x: 2, y: 0 }, new Unit({ name: 'Zed', stars: 1 }))
        .setUnit({ x: 3, y: 0 }, new Unit({ name: 'Zed', stars: 1 }))
        .setUnit({ x: 4, y: 0 }, new Unit({ name: 'Maokai', stars: 1 }))
        .setUnit({ x: 5, y: 0 }, new Unit({ name: 'Maokai', stars: 1 }))
        .setUnit({ x: 6, y: 0 }, new Unit({ name: 'Poppy', stars: 1 }))
        .setUnit({ x: 7, y: 0 }, new Unit({ name: 'Poppy', stars: 1 }))
        .setUnit({ x: 8, y: 0 }, new Unit({ name: 'Tristana', stars: 1 })),
      shopChampionNames: [
        'Cassiopeia',
        'Tristana',
        'Tristana',
        'Maokai',
        'Maokai',
      ],
    }));
  }, []);

  const buyExperience = useCallback(() => {
    if (!computed.isEnoughGoldToBuyExperience) return;
    if (computed.isMaxLevelReached) return;
    setState((s) => ({
      ...s,
      experience: s.experience + EXPERIENCE_PER_BUY,
      gold: s.gold - GOLD_PER_EXPERIENCE_BUY,
    }));
  }, [computed.isEnoughGoldToBuyExperience, computed.isMaxLevelReached]);

  const buyChampion = useCallback(
    (index: number) => {
      const championName = state.shopChampionNames[index];
      if (championName === undefined) return;

      const champion = CHAMPIONS_MAP[championName];
      if (state.gold < champion.tier) return;

      const emptySlot = state.bench.getFirstEmptySlot();
      if (!emptySlot) {
        const benchUnitsCoords = state.bench.getCoordsOfUnitsOfStars(
          championName,
          2,
          1,
        );
        const tableUnitsCoords = state.table.getCoordsOfUnitsOfStars(
          championName,
          2,
          1,
        );
        if (!benchUnitsCoords.length && !tableUnitsCoords.length) {
          return;
        }

        const shopChampionIndexes = [
          index,
          ...state.shopChampionNames
            .map((name, i) => (name === championName ? i : -1))
            .filter((i) => i !== -1 && i !== index),
        ];
        const amountToBuy =
          3 - (benchUnitsCoords.length + tableUnitsCoords.length);
        if (shopChampionIndexes.length < amountToBuy) {
          return;
        }
        if (state.gold < amountToBuy * champion.tier) {
          return;
        }

        setState((s) => {
          const newChampNames = [...s.shopChampionNames];
          times(amountToBuy, (i) => {
            newChampNames[shopChampionIndexes[i]] = undefined;
          });
          return {
            ...s,
            gold: s.gold - amountToBuy * champion.tier,
            shopChampionNames: newChampNames,
          };
        });
        setState((s) => mergeUnits(s, { championName, minUnitsAmount: 1 }));
        return;
      }

      setState((s) => {
        const newChampNames = [...s.shopChampionNames];
        newChampNames[index] = undefined;
        return {
          ...s,
          bench: s.bench.setUnit(
            emptySlot,
            new Unit({ name: championName, stars: 1 }),
          ),
          gold: s.gold - champion.tier,
          shopChampionNames: newChampNames,
        };
      });
      setState((s) => mergeUnits(s, { championName }));
    },
    [state.shopChampionNames, state.gold, state.bench, state.table],
  );

  const sellChampion = useCallback(
    ({ coords, gridType }: UnitContext) => {
      const unit = state[gridType].getUnit(coords);
      if (!unit) return;
      const champion = CHAMPIONS_MAP[unit.name];
      setState((s) => ({
        ...s,
        [gridType]: s[gridType].setUnit(coords, undefined),
      }));
      setState((s) => {
        const newGold = s.gold + champion.tier * Math.pow(3, unit.stars - 1);
        return {
          ...s,
          shopChampionPool: {
            ...s.shopChampionPool,
            [unit.name]: s.shopChampionPool[unit.name] + 1,
          },
          gold: champion.tier === 1 || unit.stars === 1 ? newGold : newGold - 1,
        };
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.bench, state.table],
  );

  const canMoveUnit = useCallback(
    (source: UnitContext, dest: UnitContext): boolean => {
      const unitFrom = state[source.gridType].getUnit(source.coords);
      if (!unitFrom) return false;

      const unitTo = state[dest.gridType].getUnit(dest.coords);

      if (
        source.gridType === GridType.Bench &&
        dest.gridType === GridType.Table &&
        !unitTo &&
        state.table.units.length >= computed.level
      ) {
        return false;
      }

      return true;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.bench, state.table, computed.level],
  );

  const moveUnit = useCallback(
    (source: UnitContext, dest: UnitContext) => {
      if (!canMoveUnit(source, dest)) return;
      setState((s) => {
        const sourceGrid = s[source.gridType];
        const destGrid = s[dest.gridType];
        const unitFrom = sourceGrid.getUnit(source.coords);
        const unitTo = destGrid.getUnit(dest.coords);
        if (source.gridType === dest.gridType) {
          return {
            ...s,
            [source.gridType]: sourceGrid
              .setUnit(source.coords, unitTo)
              .setUnit(dest.coords, unitFrom),
          };
        }
        return {
          ...s,
          [source.gridType]: sourceGrid.setUnit(source.coords, unitTo),
          [dest.gridType]: destGrid.setUnit(dest.coords, unitFrom),
        };
      });
    },
    [canMoveUnit],
  );

  const reroll = useCallback(() => {
    if (!computed.isEnoughGoldToReroll) return;

    setState((s) => {
      const shopChampionPool = { ...s.shopChampionPool };
      s.shopChampionNames.forEach((name) => {
        if (name === undefined) return;
        shopChampionPool[name] = shopChampionPool[name] + 1;
      });

      return { ...s, shopChampionPool };
    });
    setState((s) => rerollShop(s));
    setState((s) => ({ ...s, gold: s.gold - GOLD_PER_REROLL }));
  }, [computed.isEnoughGoldToReroll]);

  useKeyPressEvent('d', null, reroll);
  useKeyPressEvent('f', null, buyExperience);

  const value = useMemo(
    (): TftContextType => ({
      ...state,
      ...computed,
      buyExperience,
      buyChampion,
      sellChampion,
      canMoveUnit,
      moveUnit,
      reroll,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      state.gold,
      state.experience,
      state.bench,
      state.table,
      state.shopChampionNames,
      state.shopChampionPool,
    ],
  );

  return (
    <TftContext.Provider value={value}>{props.children}</TftContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTftState = () => useContext(TftContext);

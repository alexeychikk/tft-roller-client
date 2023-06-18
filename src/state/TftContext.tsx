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
} from '../constants';
import { weightedRandom } from '../utils';

export type TftContextType = {
  gold: number;
  experience: number;
  shopChampionNames: (string | undefined)[];
  shopChampionPool: Record<string, number>;
  level: number;
  levelAbove?: number;
  rerollChances: number[];
  isEnoughGoldToBuyExperience: boolean;
  isEnoughGoldToReroll: boolean;
  isMaxLevelReached: boolean;
  buyExperience: () => void;
  buyChampion: (index: number) => void;
  reroll: () => void;
};

export const TftContext = React.createContext<TftContextType>({
  gold: 0,
  experience: 0,
  shopChampionNames: [],
  shopChampionPool: {},
  level: 0,
  rerollChances: [],
  isEnoughGoldToBuyExperience: false,
  isEnoughGoldToReroll: false,
  isMaxLevelReached: false,
  buyExperience: noop,
  buyChampion: noop,
  reroll: noop,
});

export type TftProviderProps = {
  children: React.ReactNode;
};

export const TftProvider: React.FC<TftProviderProps> = (props) => {
  const [gold, setGold] = useState(300);
  const [experience, setExperience] = useState(20);

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
      const tierSpec = rerollChancesLocal.reduce(
        (result, probability, index) => {
          result[index + 1] = probability;
          return result;
        },
        {} as Record<number, number>,
      );

      const tier = +weightedRandom(tierSpec);

      const tierPool = pickBy(
        newChampionPool,
        (_, name) => CHAMPIONS_MAP[name].tier === tier,
      );
      const totalTierPoolSize = sumBy(
        Object.keys(tierPool),
        (name) => tierPool[name],
      );
      const champSpec = mapValues(tierPool, (size) => size / totalTierPoolSize);
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

      setGold((g) => g - champion.tier);
      setShopChampionNames((champNames) => {
        const res = [...champNames];
        res[index] = undefined;
        return res;
      });
    },
    [shopChampionNames, gold],
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
      level,
      levelAbove,
      rerollChances,
      isEnoughGoldToBuyExperience,
      isEnoughGoldToReroll,
      isMaxLevelReached,
      buyExperience,
      buyChampion,
      reroll,
    }),
    [gold, experience, shopChampionNames, shopChampionPool],
  );

  return (
    <TftContext.Provider value={value}>{props.children}</TftContext.Provider>
  );
};

export const useTftState = () => useContext(TftContext);

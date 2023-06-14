import { noop } from 'lodash-es';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import {
  EXPERIENCE_PER_BUY,
  EXPERIENCE_PER_LEVEL,
  GOLD_PER_EXPERIENCE_BUY,
  MAX_LEVEL,
  MIN_LEVEL,
  REROLL_CHANCES,
  CHAMPIONS,
} from '../constants';

export type TftContextType = {
  gold: number;
  experience: number;
  shopChampionNames: (string | undefined)[];
  level: number;
  levelAbove?: number;
  rerollChances: number[];
  isEnoughGoldToBuyExperience: boolean;
  isMaxLevelReached: boolean;
  buyExperience: () => void;
  buyChampion: (index: number) => void;
};

export const TftContext = React.createContext<TftContextType>({
  gold: 0,
  experience: 0,
  shopChampionNames: [],
  level: 0,
  rerollChances: [],
  isEnoughGoldToBuyExperience: false,
  isMaxLevelReached: false,
  buyExperience: noop,
  buyChampion: noop,
});

export type TftProviderProps = {
  children: React.ReactNode;
};

export const TftProvider: React.FC<TftProviderProps> = (props) => {
  const [gold, setGold] = useState(256);
  const [experience, setExperience] = useState(2);
  const [shopChampionNames, setShopChampionNames] = useState([
    'Viego',
    'Poppy',
    'Viego',
    undefined,
    'Sona',
  ]);
  const isEnoughGoldToBuyExperience = gold >= GOLD_PER_EXPERIENCE_BUY;
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

  const buyExperience = useCallback(() => {
    if (!isEnoughGoldToBuyExperience) return;
    if (isMaxLevelReached) return;
    setExperience((exp) => exp + EXPERIENCE_PER_BUY);
    setGold((g) => g - GOLD_PER_EXPERIENCE_BUY);
  }, [gold, experience]);

  const buyChampion = useCallback(
    (index: number) => {
      const championName = shopChampionNames[index];
      if (championName === undefined) return;

      const champion = CHAMPIONS.find((champ) => champ.name === championName)!;
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

  const value = useMemo(
    (): TftContextType => ({
      gold,
      experience,
      shopChampionNames,
      level,
      levelAbove,
      rerollChances,
      isEnoughGoldToBuyExperience,
      isMaxLevelReached,
      buyExperience,
      buyChampion,
    }),
    [gold, experience, shopChampionNames],
  );

  return (
    <TftContext.Provider value={value}>{props.children}</TftContext.Provider>
  );
};

export const useTftState = () => useContext(TftContext);

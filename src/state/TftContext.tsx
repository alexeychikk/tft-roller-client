import { noop } from 'lodash-es';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import {
  EXPERIENCE_PER_LEVEL,
  MAX_LEVEL,
  EXPERIENCE_PER_BUY,
  GOLD_PER_EXPERIENCE_BUY,
} from '../constants';

export type TftContextType = {
  gold: number;
  experience: number;
  level: number;
  levelAbove?: number;
  isEnoughGoldToBuyExperience: boolean;
  isMaxLevelReached: boolean;
  buyExperience: () => void;
};

export const TftContext = React.createContext<TftContextType>({
  gold: 0,
  experience: 0,
  level: 0,
  isEnoughGoldToBuyExperience: false,
  isMaxLevelReached: false,
  buyExperience: noop,
});

export type TftProviderProps = {
  children: React.ReactNode;
};

export const TftProvider: React.FC<TftProviderProps> = (props) => {
  const [gold, setGold] = useState(256);
  const [experience, setExperience] = useState(16);
  const isEnoughGoldToBuyExperience = gold >= GOLD_PER_EXPERIENCE_BUY;
  const isMaxLevelReached = experience >= EXPERIENCE_PER_LEVEL[MAX_LEVEL];

  const levelAboveName = Object.keys(EXPERIENCE_PER_LEVEL).find((level) => {
    const exp = EXPERIENCE_PER_LEVEL[+level];
    return experience < exp;
  });
  const levelAbove = levelAboveName ? +levelAboveName : undefined;
  const level = levelAbove !== undefined ? levelAbove - 1 : MAX_LEVEL;

  const buyExperience = useCallback(() => {
    if (!isEnoughGoldToBuyExperience) return;
    if (isMaxLevelReached) return;
    setExperience((exp) => exp + EXPERIENCE_PER_BUY);
    setGold((g) => g - GOLD_PER_EXPERIENCE_BUY);
  }, [gold, experience]);

  const value = useMemo(
    () => ({
      gold,
      experience,
      level,
      levelAbove,
      isEnoughGoldToBuyExperience,
      isMaxLevelReached,
      buyExperience,
    }),
    [gold, experience, buyExperience],
  );

  return (
    <TftContext.Provider value={value}>{props.children}</TftContext.Provider>
  );
};

export const useTftState = () => useContext(TftContext);

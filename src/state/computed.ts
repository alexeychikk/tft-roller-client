import {
  EXPERIENCE_PER_LEVEL,
  GOLD_PER_EXPERIENCE_BUY,
  GOLD_PER_REROLL,
  MAX_LEVEL,
  MIN_LEVEL,
  REROLL_CHANCES,
} from '@src/constants';
import { TftContextComputed, TftContextState } from './TftContext';

export function getComputedState({
  gold,
  experience,
}: TftContextState): TftContextComputed {
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

  return {
    isEnoughGoldToBuyExperience,
    isEnoughGoldToReroll,
    isMaxLevelReached,
    level,
    levelAbove,
    rerollChances,
  };
}

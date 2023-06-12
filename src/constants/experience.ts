export const EXPERIENCE_PER_LEVEL: Record<number, number> = {
  1: 0,
  2: 2,
  3: 4,
  4: 10,
  5: 20,
  6: 40,
  7: 76,
  8: 132,
  9: 212,
  10: 312,
};

const ALL_LEVELS = Object.keys(EXPERIENCE_PER_LEVEL);
export const MAX_LEVEL = +ALL_LEVELS[ALL_LEVELS.length - 1];

import { sortedIndexBy } from 'lodash-es';
import { Champion, CHAMPIONS } from './champions';

export const TRAIT_TO_CHAMPIONS_MAP = (() => {
  const res: Record<string, Champion[]> = {};

  for (const champ of CHAMPIONS) {
    for (const trait of champ.classTraits) {
      res[trait] ??= [];
      res[trait].splice(
        sortedIndexBy(res[trait], champ, (ch) => ch.tier),
        0,
        champ,
      );
    }
    for (const trait of champ.originTraits) {
      res[trait] ??= [];
      res[trait].splice(
        sortedIndexBy(res[trait], champ, (ch) => ch.tier),
        0,
        champ,
      );
    }
  }

  return res;
})();
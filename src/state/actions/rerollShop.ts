import { mapValues, pickBy, sumBy, times } from 'lodash-es';

import { CHAMPIONS_MAP } from '@src/constants';
import { weightedRandom } from '@src/utils';

import { TftContextState } from '../TftContext';
import { getComputedState } from '../computed';

export function rerollShop(state: TftContextState): TftContextState {
  const newChampionNames = [...state.shopChampionNames];
  const newChampionPool = { ...state.shopChampionPool };
  const computed = getComputedState(state);

  times(state.shopChampionNames.length, (index) => {
    const poolByTier: Record<
      number,
      { pool: Record<string, number>; total: number }
    > = {};

    const tierSpec = computed.rerollChances.reduce(
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

    newChampionNames[index] = championName;
    newChampionPool[championName] = newChampionPool[championName] - 1;
  });

  return {
    ...state,
    shopChampionNames: newChampionNames,
    shopChampionPool: newChampionPool,
  };
}

import { sumBy } from 'lodash-es';
import { ALL_TRAITS_MAP, CHAMPIONS, REROLL_CHANCES } from '../constants';
import { traverseUniqueCombinations } from '../utils';

export function calculateComps(
  level: number,
  traitActivationsThreshold: number,
  desiredTraits: string[] = [],
  minTier = 1,
  maxTier = 5,
) {
  const rerollChances = REROLL_CHANCES[level];
  const champs = CHAMPIONS.filter(
    (champ) => rerollChances[champ.tier - 1] > 0,
  ).filter((champ) => champ.tier >= minTier && champ.tier <= maxTier);

  console.log('Traversing...');

  traverseUniqueCombinations(champs, level, (comb, iteration) => {
    const champsPerTrait: Record<string, number> = {};
    for (const champ of comb) {
      for (const trait of champ.classTraits) {
        champsPerTrait[trait] = champsPerTrait[trait] || 0;
        champsPerTrait[trait]++;
      }
      for (const trait of champ.originTraits) {
        champsPerTrait[trait] = champsPerTrait[trait] || 0;
        champsPerTrait[trait]++;
      }
    }

    let uniqueActivations = 0;
    let totalActivations = 0;
    const activationsPerTrait: Record<string, number> = {};

    for (let trait in champsPerTrait) {
      const { activations } = ALL_TRAITS_MAP[trait];
      if (activations.length === 1 && activations[0] === 1) continue;
      const champsOfTrait = champsPerTrait[trait];

      const activationLevel =
        champsOfTrait < activations[0]
          ? 0
          : champsOfTrait >= activations[activations.length - 1]
          ? activations.length
          : activations.findIndex(
              (ac, i) =>
                champsOfTrait >= ac && champsOfTrait < activations[i + 1],
            ) + 1;
      if (activationLevel > 0) {
        uniqueActivations++;
        totalActivations += activationLevel;
        activationsPerTrait[trait] = activationLevel;
      }
    }

    if (uniqueActivations >= traitActivationsThreshold) {
      console.log(
        `unique (${sumBy(comb, (ch) => ch.tier)}) | `,
        comb.map((c) => c.name).join(', '),
        activationsPerTrait,
      );
    } else if (totalActivations >= traitActivationsThreshold) {
      console.log(
        `total (${sumBy(comb, (ch) => ch.tier)}) | `,
        comb.map((c) => c.name).join(', '),
        activationsPerTrait,
      );
    }
  });

  console.log('Done!');
}

// calculateComps(5, 5, [], 1, 3);
// let i = 0;
// let acc = '';
// let count = 0;
// let total = 0;
// traverseUniqueCombinations(
//   times(10, (i) => i),
//   4,
//   (arr, t) => {
//     if (arr[0] !== i) {
//       console.log(count, acc);
//       acc = '';
//       i = arr[0];
//       count = 0;
//     }
//     acc += arr.join('') + ' ';
//     count++;
//     total = t;
//   },
// );
// console.log(count, acc);
// console.log('--------');
// console.log(total);

/**
 n=8  k=4
 0123 1234
 0124 1235
 0125 1236
 0126 1237
 0127 1245
 0134 1246
 0135 1247
 0136 1256
 0137 1257
 0145 1267
 0146 1345
 0147 1346
 0156 1347
 0157 1356
 0167 1357
 0234 1367
 0235 1456
 0236 1457 
 0237 1467  
 0245 1567  
 0246 2345  
 0247 2346  
 0256 2347  
 0257 2356  
 0267 2357  
 0345 2367  
 0346 2456  
 0347 2457  
 0356 2467  
 0357 2567  
 0367 3456  
 0456 3457  
 0457 3467  
 0467 3567  
 0567 4567  
 */

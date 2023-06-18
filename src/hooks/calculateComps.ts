import { ALL_TRAITS_MAP, CHAMPIONS, REROLL_CHANCES } from '../constants';
import { traverseUniqueCombinations } from '../utils';

export function calculateComps(
  level: number,
  traitActivationsThreshold: number,
  minTier = 1,
  maxTier = 5,
) {
  const rerollChances = REROLL_CHANCES[level];
  const champs = CHAMPIONS.filter(
    (champ) => rerollChances[champ.tier - 1] > 0,
  ).filter((champ) => champ.tier >= minTier && champ.tier < maxTier);

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
        'unique | ',
        comb.map((c) => c.name).join(', '),
        activationsPerTrait,
      );
    } else if (totalActivations >= traitActivationsThreshold) {
      console.log(
        'total | ',
        comb.map((c) => c.name).join(', '),
        activationsPerTrait,
      );
    }
  });

  console.log('Done!');
}

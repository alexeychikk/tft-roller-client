import { TraitHexType } from '@src/components/dumb/TraitHex';
import { ALL_TRAITS_MAP, TRAIT_TO_CHAMPIONS_MAP } from '@tft-roller';

export function getHexType(
  trait: string,
  activationLevel: number,
): TraitHexType {
  if (activationLevel === 0) return TraitHexType.Disabled;
  const { activations } = ALL_TRAITS_MAP[trait];
  if (activationLevel === 1) {
    return activations.length === 1 ? TraitHexType.Gold : TraitHexType.Bronze;
  }

  const champsOfTrait = TRAIT_TO_CHAMPIONS_MAP[trait];
  const requiresEmblem =
    champsOfTrait.length < activations[activations.length - 1];

  if (activationLevel === activations.length) {
    return requiresEmblem ? TraitHexType.Chromatic : TraitHexType.Gold;
  }
  if (activationLevel === activations.length - 1) {
    return requiresEmblem ? TraitHexType.Gold : TraitHexType.Silver;
  }
  return TraitHexType.Silver;
}

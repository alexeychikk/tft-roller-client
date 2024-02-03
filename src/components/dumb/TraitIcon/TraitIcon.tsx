import React from 'react';

import Bastion from '@src/assets/icons/traits/bastion.svg?react';
import Bruiser from '@src/assets/icons/traits/bruiser.svg?react';
import Challenger from '@src/assets/icons/traits/challenger.svg?react';
import Darkin from '@src/assets/icons/traits/darkin.svg?react';
import Deadeye from '@src/assets/icons/traits/deadeye.svg?react';
import Demacia from '@src/assets/icons/traits/demacia.svg?react';
import Empress from '@src/assets/icons/traits/empress.svg?react';
import Freljord from '@src/assets/icons/traits/freljord.svg?react';
import Gunner from '@src/assets/icons/traits/gunner.svg?react';
import Invoker from '@src/assets/icons/traits/invoker.svg?react';
import Ionia from '@src/assets/icons/traits/ionia.svg?react';
import Juggernaut from '@src/assets/icons/traits/juggernaut.svg?react';
import Multicaster from '@src/assets/icons/traits/multicaster.svg?react';
import Noxus from '@src/assets/icons/traits/noxus.svg?react';
import Piltover from '@src/assets/icons/traits/piltover.svg?react';
import Redeemer from '@src/assets/icons/traits/redeemer.svg?react';
import Rogue from '@src/assets/icons/traits/rogue.svg?react';
import ShadowIsles from '@src/assets/icons/traits/shadow_isles.svg?react';
import Shurima from '@src/assets/icons/traits/shurima.svg?react';
import Slayer from '@src/assets/icons/traits/slayer.svg?react';
import Sorcerer from '@src/assets/icons/traits/sorcerer.svg?react';
import Strategist from '@src/assets/icons/traits/strategist.svg?react';
import Targon from '@src/assets/icons/traits/targon.svg?react';
import Technogenius from '@src/assets/icons/traits/technogenius.svg?react';
import Void from '@src/assets/icons/traits/void.svg?react';
import Wanderer from '@src/assets/icons/traits/wanderer.svg?react';
import Yordle from '@src/assets/icons/traits/yordle.svg?react';
import Zaun from '@src/assets/icons/traits/zaun.svg?react';

const TRAIT_ICONS: Record<string, typeof Bastion> = {
  Bastion: Bastion,
  Bruiser: Bruiser,
  Challenger: Challenger,
  Darkin: Darkin,
  Deadeye: Deadeye,
  Demacia: Demacia,
  Empress: Empress,
  Freljord: Freljord,
  Gunner: Gunner,
  Invoker: Invoker,
  Ionia: Ionia,
  Juggernaut: Juggernaut,
  Multicaster: Multicaster,
  Noxus: Noxus,
  Piltover: Piltover,
  Redeemer: Redeemer,
  Rogue: Rogue,
  'Shadow Isles': ShadowIsles,
  Shurima: Shurima,
  Slayer: Slayer,
  Sorcerer: Sorcerer,
  Strategist: Strategist,
  Targon: Targon,
  Technogenius: Technogenius,
  Void: Void,
  Wanderer: Wanderer,
  Yordle: Yordle,
  Zaun: Zaun,
};

export type TraitIconProps = React.ComponentProps<'svg'> & {
  title?: string;
  trait: string;
};

const TraitIconBase: React.FC<TraitIconProps> = ({ trait, ...restProps }) => {
  const Icon = TRAIT_ICONS[trait];
  return <Icon {...restProps} />;
};

export const TraitIcon = React.memo(TraitIconBase);

import React from 'react';

import { ReactComponent as Bastion } from '@src/assets/icons/traits/bastion.svg';
import { ReactComponent as Bruiser } from '@src/assets/icons/traits/bruiser.svg';
import { ReactComponent as Challenger } from '@src/assets/icons/traits/challenger.svg';
import { ReactComponent as Darkin } from '@src/assets/icons/traits/darkin.svg';
import { ReactComponent as Deadeye } from '@src/assets/icons/traits/deadeye.svg';
import { ReactComponent as Demacia } from '@src/assets/icons/traits/demacia.svg';
import { ReactComponent as Empress } from '@src/assets/icons/traits/empress.svg';
import { ReactComponent as Freljord } from '@src/assets/icons/traits/freljord.svg';
import { ReactComponent as Gunner } from '@src/assets/icons/traits/gunner.svg';
import { ReactComponent as Invoker } from '@src/assets/icons/traits/invoker.svg';
import { ReactComponent as Ionia } from '@src/assets/icons/traits/ionia.svg';
import { ReactComponent as Juggernaut } from '@src/assets/icons/traits/juggernaut.svg';
import { ReactComponent as Multicaster } from '@src/assets/icons/traits/multicaster.svg';
import { ReactComponent as Noxus } from '@src/assets/icons/traits/noxus.svg';
import { ReactComponent as Piltover } from '@src/assets/icons/traits/piltover.svg';
import { ReactComponent as Redeemer } from '@src/assets/icons/traits/redeemer.svg';
import { ReactComponent as Rogue } from '@src/assets/icons/traits/rogue.svg';
import { ReactComponent as ShadowIsles } from '@src/assets/icons/traits/shadow_isles.svg';
import { ReactComponent as Shurima } from '@src/assets/icons/traits/shurima.svg';
import { ReactComponent as Slayer } from '@src/assets/icons/traits/slayer.svg';
import { ReactComponent as Sorcerer } from '@src/assets/icons/traits/sorcerer.svg';
import { ReactComponent as Strategist } from '@src/assets/icons/traits/strategist.svg';
import { ReactComponent as Targon } from '@src/assets/icons/traits/targon.svg';
import { ReactComponent as Technogenius } from '@src/assets/icons/traits/technogenius.svg';
import { ReactComponent as Void } from '@src/assets/icons/traits/void.svg';
import { ReactComponent as Wanderer } from '@src/assets/icons/traits/wanderer.svg';
import { ReactComponent as Yordle } from '@src/assets/icons/traits/yordle.svg';
import { ReactComponent as Zaun } from '@src/assets/icons/traits/zaun.svg';

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
  trait: string;
};

const TraitIconBase: React.FC<TraitIconProps> = ({ trait, ...restProps }) => {
  const Icon = TRAIT_ICONS[trait];
  return <Icon {...restProps} />;
};

export const TraitIcon = React.memo(TraitIconBase);

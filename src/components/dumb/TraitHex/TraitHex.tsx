import clsx from 'clsx';
import React from 'react';

import Bronze from '@src/assets/icons/hexes/bronze.svg?react';
import Chromatic from '@src/assets/icons/hexes/chromatic.svg?react';
import Default from '@src/assets/icons/hexes/default.svg?react';
import Disabled from '@src/assets/icons/hexes/disabled.svg?react';
import Gold from '@src/assets/icons/hexes/gold.svg?react';
import Silver from '@src/assets/icons/hexes/silver.svg?react';

import styles from './TraitHex.module.scss';

export enum TraitHexType {
  Default = 'Default',
  Disabled = 'Disabled',
  Bronze = 'Bronze',
  Silver = 'Silver',
  Gold = 'Gold',
  Chromatic = 'Chromatic',
}

const HEX_ICON = {
  [TraitHexType.Default]: Default,
  [TraitHexType.Disabled]: Disabled,
  [TraitHexType.Bronze]: Bronze,
  [TraitHexType.Silver]: Silver,
  [TraitHexType.Gold]: Gold,
  [TraitHexType.Chromatic]: Chromatic,
};

export type TraitHexProps = {
  className?: string;
  children?: React.ReactNode;
  hexType?: TraitHexType;
};

const TraitHexBase: React.FC<TraitHexProps> = (props) => {
  const Icon = HEX_ICON[props.hexType || TraitHexType.Default];
  return (
    <div className={clsx(styles.rootTraitHex, props.className)}>
      <div className={styles.iconWrapper}>
        <Icon className={styles.icon} />
      </div>
      <div className={styles.childrenWrapper}>{props.children}</div>
    </div>
  );
};

export const TraitHex = React.memo(TraitHexBase);

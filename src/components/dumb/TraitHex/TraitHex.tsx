import React from 'react';
import clsx from 'clsx';

import { ReactComponent as Default } from '@src/assets/icons/hexes/default.svg';
import { ReactComponent as Disabled } from '@src/assets/icons/hexes/disabled.svg';
import { ReactComponent as Bronze } from '@src/assets/icons/hexes/bronze.svg';
import { ReactComponent as Silver } from '@src/assets/icons/hexes/silver.svg';
import { ReactComponent as Gold } from '@src/assets/icons/hexes/gold.svg';
import { ReactComponent as Chromatic } from '@src/assets/icons/hexes/chromatic.svg';

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

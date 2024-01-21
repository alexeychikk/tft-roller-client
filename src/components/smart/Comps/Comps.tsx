import { observer } from 'mobx-react-lite';
import React from 'react';
import { getCompStats } from '@tft-roller';

import { TraitStats } from '@src/components/dumb/TraitStats';
import { tftStore } from '@src/state';

import styles from './Comps.module.scss';

export type CompsProps = {
  /* empty */
};

const CompsBase: React.FC<CompsProps> = () => {
  const stats = tftStore.viewedPlayer
    ? getCompStats(tftStore.viewedPlayer.table.units.map((u) => u.name)).slice(
        0,
        9,
      )
    : [];

  if (!stats.length) return null;

  return (
    <div className={styles.rootComps}>
      {stats.map((stat) => (
        <TraitStats className={styles.traitStats} key={stat.trait} {...stat} />
      ))}
    </div>
  );
};

export const Comps = observer(CompsBase);

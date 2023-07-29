import React from 'react';
import clsx from 'clsx';

import { CompStats } from '@src/utils';
import { ALL_TRAITS_MAP } from '@src/constants';

import styles from './TraitStats.module.scss';

export type TraitStatsProps = CompStats & {
  className?: string;
};

const TraitStatsBase: React.FC<TraitStatsProps> = (props) => {
  const { activations } = ALL_TRAITS_MAP[props.trait];
  const activated = props.activationLevel > 0;

  return (
    <div
      className={clsx(
        styles.rootTraitStats,
        activated && styles.activated,
        props.className,
      )}
    >
      <div className={styles.icon}></div>
      <div className={styles.amount}>{props.champions.length}</div>
      <div className={styles.activationsWrapper}>
        <div className={styles.traitName}>{props.trait}</div>
        {activated ? (
          <div className={styles.activations}>{activations.join(' > ')}</div>
        ) : (
          <div className={styles.threshold}>
            {props.champions.length} / {activations[0]}
          </div>
        )}
      </div>
    </div>
  );
};

export const TraitStats = React.memo(TraitStatsBase);

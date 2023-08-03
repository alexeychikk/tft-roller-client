import React from 'react';
import clsx from 'clsx';

import { CompStats } from '@src/utils';
import { ALL_TRAITS_MAP } from '@src/constants';
import { TraitIcon } from '@src/components/dumb/TraitIcon';
import { TraitHex } from '@src/components/dumb/TraitHex';

import { getHexType } from './getHexType';
import styles from './TraitStats.module.scss';

export type TraitStatsProps = CompStats & {
  className?: string;
};

const TraitStatsBase: React.FC<TraitStatsProps> = (props) => {
  const { activations } = ALL_TRAITS_MAP[props.trait];
  const activated = props.activationLevel > 0;
  const hexType = getHexType(props.trait, props.activationLevel);

  return (
    <div
      className={clsx(
        styles.rootTraitStats,
        activated && styles.activated,
        props.className,
      )}
    >
      <TraitHex hexType={hexType}>
        <TraitIcon trait={props.trait} />
      </TraitHex>

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
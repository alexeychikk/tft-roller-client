import clsx from 'clsx';
import React from 'react';

import { TraitHex } from '@src/components/dumb/TraitHex';
import { TraitIcon } from '@src/components/dumb/TraitIcon';

import styles from './TraitTitle.module.scss';

export type TraitTitleProps = {
  className?: string;
  trait: string;
};

const TraitTitleBase: React.FC<TraitTitleProps> = (props) => {
  return (
    <div className={clsx(styles.rootTraitTitle, props.className)}>
      <TraitHex className={styles.traitHex}>
        <TraitIcon trait={props.trait} />
      </TraitHex>

      <span className={styles.traitName}>{props.trait}</span>
    </div>
  );
};

export const TraitTitle = React.memo(TraitTitleBase);

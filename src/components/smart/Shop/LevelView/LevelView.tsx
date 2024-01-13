import React from 'react';
import { observer } from 'mobx-react-lite';

import { tftStore } from '@src/state';
import { EXPERIENCE_PER_BUY, EXPERIENCE_PER_LEVEL } from '@src/constants';
import { SegmentedProgressBar } from '@src/components/dumb/SegmentedProgressBar';

import styles from './LevelView.module.scss';

export type LevelViewProps = {
  /* empty */
};

const LevelViewBase: React.FC<LevelViewProps> = () => {
  const levelExperience = EXPERIENCE_PER_LEVEL[tftStore.level] || 0;
  const experienceToLevelUp =
    tftStore.levelAbove !== undefined
      ? EXPERIENCE_PER_LEVEL[tftStore.levelAbove] - levelExperience
      : undefined;
  const relativeLevelExperience =
    experienceToLevelUp !== undefined
      ? tftStore.experience - levelExperience
      : undefined;

  return (
    <div className={styles.rootLevelView}>
      <div className={styles.labels}>
        <span className={styles.level}>Lvl. {tftStore.level}</span>
        <span className={styles.experience}>
          {relativeLevelExperience !== undefined
            ? `${relativeLevelExperience} / ${experienceToLevelUp}`
            : 'Max.'}
        </span>
      </div>
      <SegmentedProgressBar
        className={styles.progressBar}
        min={0}
        max={experienceToLevelUp || 0}
        step={EXPERIENCE_PER_BUY}
        value={relativeLevelExperience || 0}
      />
    </div>
  );
};

export const LevelView = observer(LevelViewBase);

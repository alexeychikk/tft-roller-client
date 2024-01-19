import React from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';

import { tftStore } from '@src/state';
import { EXPERIENCE_PER_BUY, EXPERIENCE_PER_LEVEL } from '@tft-roller';
import { SegmentedProgressBar } from '@src/components/dumb/SegmentedProgressBar';

import styles from './LevelView.module.scss';

export type LevelViewProps = {
  className?: string;
};

const LevelViewBase: React.FC<LevelViewProps> = (props) => {
  const level = tftStore.me?.level || 0;
  const levelExperience = EXPERIENCE_PER_LEVEL[level] || 0;
  const experienceToLevelUp =
    tftStore.me?.levelAbove !== undefined
      ? EXPERIENCE_PER_LEVEL[tftStore.me.levelAbove] - levelExperience
      : undefined;
  const relativeLevelExperience =
    experienceToLevelUp !== undefined
      ? tftStore.me!.experience - levelExperience
      : undefined;

  return (
    <div className={clsx(styles.rootLevelView, props.className)}>
      <div className={styles.labels}>
        <span className={styles.level}>Lvl. {level}</span>
        <span className={styles.experience}>
          {relativeLevelExperience !== undefined
            ? `${relativeLevelExperience} / ${experienceToLevelUp}`
            : 'Max.'}
        </span>
      </div>
      <SegmentedProgressBar
        className={styles.progressBar}
        fixedGap={level < 6 ? 2 : 1}
        min={0}
        max={experienceToLevelUp || 0}
        step={EXPERIENCE_PER_BUY}
        value={relativeLevelExperience || 0}
      />
    </div>
  );
};

export const LevelView = observer(LevelViewBase);

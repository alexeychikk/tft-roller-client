import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { EXPERIENCE_PER_BUY, EXPERIENCE_PER_LEVEL } from '@tft-roller';

import { SegmentedProgressBar } from '@src/components/dumb/SegmentedProgressBar';
import { useTftStore } from '@src/state';

import styles from './LevelView.module.scss';

export type LevelViewProps = {
  className?: string;
};

const LevelViewBase: React.FC<LevelViewProps> = (props) => {
  const tftStore = useTftStore();
  const level = tftStore.viewedPlayer?.level || 0;
  const levelExperience = EXPERIENCE_PER_LEVEL[level] || 0;
  const experienceToLevelUp =
    tftStore.viewedPlayer?.levelAbove !== undefined
      ? EXPERIENCE_PER_LEVEL[tftStore.viewedPlayer.levelAbove] - levelExperience
      : undefined;
  const relativeLevelExperience =
    experienceToLevelUp !== undefined
      ? tftStore.viewedPlayer!.experience - levelExperience
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

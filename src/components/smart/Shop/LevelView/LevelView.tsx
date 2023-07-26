import React from 'react';
import { observer } from 'mobx-react-lite';

import { tftStore } from '@src/state';
import { EXPERIENCE_PER_LEVEL } from '@src/constants';

import './LevelView.styles.css';

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
    <div className="tft__shop__level-view">
      <span className="tft__shop__level-indicator">Lvl. {tftStore.level}</span>
      <span className="tft__shop__exp-indicator">
        {relativeLevelExperience !== undefined
          ? `${relativeLevelExperience} / ${experienceToLevelUp}`
          : 'Max.'}
      </span>
    </div>
  );
};

export const LevelView = observer(LevelViewBase);

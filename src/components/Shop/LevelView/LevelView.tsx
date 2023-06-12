import React from 'react';

import { useTftState } from '../../../state';
import { EXPERIENCE_PER_LEVEL } from '../../../constants';

import './LevelView.styles.css';

export type LevelViewProps = {};

const LevelViewBase: React.FC<LevelViewProps> = (props) => {
  const { experience, level, levelAbove } = useTftState();

  const levelExperience = EXPERIENCE_PER_LEVEL[level] || 0;
  const experienceToLevelUp =
    levelAbove !== undefined
      ? EXPERIENCE_PER_LEVEL[levelAbove] - levelExperience
      : undefined;
  const relativeLevelExperience =
    experienceToLevelUp !== undefined
      ? experience - levelExperience
      : undefined;

  return (
    <div className="tft__shop__level-view">
      <span className="tft__shop__level-indicator">Lvl. {level}</span>
      <span className="tft__shop__exp-indicator">
        {relativeLevelExperience !== undefined
          ? `${relativeLevelExperience} / ${experienceToLevelUp}`
          : 'Max.'}
      </span>
    </div>
  );
};

export const LevelView = React.memo(LevelViewBase);

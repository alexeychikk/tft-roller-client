import React, { useContext } from 'react';
import './LevelView.styles.css';

import { TftContext } from '../../../state';
import { EXPERIENCE_PER_LEVEL, MAX_LEVEL } from '../../../constants';

export type LevelViewProps = {};

const LevelViewBase: React.FC<LevelViewProps> = (props) => {
  const { experience } = useContext(TftContext);
  const levelAboveName = Object.keys(EXPERIENCE_PER_LEVEL).find((level) => {
    const exp = EXPERIENCE_PER_LEVEL[+level];
    return experience < exp;
  });
  const levelAbove = levelAboveName ? +levelAboveName : undefined;
  const level = levelAbove !== undefined ? levelAbove - 1 : MAX_LEVEL;
  const levelExp = EXPERIENCE_PER_LEVEL[level] || 0;
  const expToLevelUp =
    levelAbove !== undefined
      ? EXPERIENCE_PER_LEVEL[levelAbove] - levelExp
      : undefined;
  const currentExp =
    expToLevelUp !== undefined ? experience - levelExp : undefined;

  return (
    <div className="tft__shop__level-view">
      <span className="tft__shop__level-indicator">Lvl. {level}</span>
      <span className="tft__shop__exp-indicator">
        {currentExp !== undefined ? `${currentExp} / ${expToLevelUp}` : 'Max.'}
      </span>
    </div>
  );
};

export const LevelView = React.memo(LevelViewBase);

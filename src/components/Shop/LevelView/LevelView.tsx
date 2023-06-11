import React from 'react';

import './LevelView.styles.css';

export type LevelViewProps = {};

const LevelViewBase: React.FC<LevelViewProps> = (props) => {
  return <div className="tft__shop__actions"></div>;
};

export const LevelView = React.memo(LevelViewBase);

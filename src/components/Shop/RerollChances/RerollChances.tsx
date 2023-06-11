import React from 'react';

import './RerollChances.styles.css';

export type RerollChancesProps = {};

const RerollChancesBase: React.FC<RerollChancesProps> = (props) => {
  return <div className="tft__shop__reroll-chances"></div>;
};

export const RerollChances = React.memo(RerollChancesBase);

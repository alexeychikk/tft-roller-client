import React from 'react';

import './GoldView.styles.css';

export type GoldViewProps = {};

const GoldViewBase: React.FC<GoldViewProps> = (props) => {
  return <div className="tft__shop__gold-view"></div>;
};

export const GoldView = React.memo(GoldViewBase);

import React from 'react';

import './Desk.styles.css';

export type DeskProps = {};

const DeskBase: React.FC<DeskProps> = (props) => {
  return <div className="tft__desk">Desk</div>;
};

export const Desk = React.memo(DeskBase);

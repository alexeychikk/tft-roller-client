import React from 'react';

import './Comps.styles.css';

export type CompsProps = {};

const CompsBase: React.FC<CompsProps> = (props) => {
  return <div className="tft__comps">Comps</div>;
};

export const Comps = React.memo(CompsBase);

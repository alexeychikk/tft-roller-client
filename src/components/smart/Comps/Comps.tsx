import React from 'react';

import './Comps.styles.css';

export type CompsProps = {
  /* empty */
};

const CompsBase: React.FC<CompsProps> = () => {
  return <div className="tft__comps">Comps</div>;
};

export const Comps = React.memo(CompsBase);

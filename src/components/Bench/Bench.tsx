import React from 'react';

import './Bench.styles.css';

export type BenchProps = {};

const BenchBase: React.FC<BenchProps> = (props) => {
  return <div className="tft__bench">Bench</div>;
};

export const Bench = React.memo(BenchBase);

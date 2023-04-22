import React from 'react';

export type GoldBucketsProps = {};

const GoldBucketsBase: React.FC<GoldBucketsProps> = (props) => {
  return <div>Gold</div>;
};

export const GoldBuckets = React.memo(GoldBucketsBase);

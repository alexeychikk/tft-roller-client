import React from 'react';

import './ShopChampions.styles.css';

export type ShopChampionsProps = {};

const ShopChampionsBase: React.FC<ShopChampionsProps> = (props) => {
  return <div className="tft__shop__champions"></div>;
};

export const ShopChampions = React.memo(ShopChampionsBase);

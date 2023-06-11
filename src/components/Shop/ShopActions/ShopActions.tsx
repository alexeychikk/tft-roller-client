import React from 'react';

import './ShopActions.styles.css';

export type ShopActionsProps = {};

const ShopActionsBase: React.FC<ShopActionsProps> = (props) => {
  return <div className="tft__shop__actions"></div>;
};

export const ShopActions = React.memo(ShopActionsBase);

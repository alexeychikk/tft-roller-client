import React from 'react';
import { ReactComponent as IconCoin } from '../../../assets/icons/coin.svg';
import { useTftState } from '../../../state';

import './GoldView.styles.css';

export type GoldViewProps = {};

const GoldViewBase: React.FC<GoldViewProps> = (props) => {
  const { gold } = useTftState();
  return (
    <div className="tft__shop__gold-view">
      <IconCoin className="tft__icon-coin" /> {gold}
    </div>
  );
};

export const GoldView = React.memo(GoldViewBase);

import React from 'react';
import { observer } from 'mobx-react-lite';

import { ReactComponent as IconCoin } from '@src/assets/icons/coin.svg';
import { tftStore } from '@src/state';

import './GoldView.styles.css';

export type GoldViewProps = {
  /* empty */
};

const GoldViewBase: React.FC<GoldViewProps> = () => {
  return (
    <div className="tft__shop__gold-view">
      <IconCoin className="tft__icon-coin" /> {tftStore.gold}
    </div>
  );
};

export const GoldView = observer(GoldViewBase);

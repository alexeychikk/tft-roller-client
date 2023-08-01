import React from 'react';
import { observer } from 'mobx-react-lite';

import { ReactComponent as IconCoin } from '@src/assets/icons/common/coin.svg';
import { tftStore } from '@src/state';

import styles from './GoldView.module.scss';

export type GoldViewProps = {
  /* empty */
};

const GoldViewBase: React.FC<GoldViewProps> = () => {
  return (
    <div className={styles.rootGoldView}>
      <IconCoin className={styles.iconCoin} /> {tftStore.gold}
    </div>
  );
};

export const GoldView = observer(GoldViewBase);

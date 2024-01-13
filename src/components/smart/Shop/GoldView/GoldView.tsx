import React from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';

import { ReactComponent as IconCoin } from '@src/assets/icons/common/coin.svg';
import { tftStore } from '@src/state';

import styles from './GoldView.module.scss';

export type GoldViewProps = {
  className?: string;
};

const GoldViewBase: React.FC<GoldViewProps> = (props) => {
  return (
    <div className={clsx(styles.rootGoldView, props.className)}>
      <IconCoin className={styles.iconCoin} /> {tftStore.gold}
    </div>
  );
};

export const GoldView = observer(GoldViewBase);

import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import React from 'react';

import IconCoin from '@src/assets/icons/common/coin.svg?react';
import { tftStore } from '@src/state';

import styles from './GoldView.module.scss';

export type GoldViewProps = {
  className?: string;
};

const GoldViewBase: React.FC<GoldViewProps> = (props) => {
  return (
    <div className={clsx(styles.rootGoldView, props.className)}>
      <IconCoin className={styles.iconCoin} />{' '}
      {tftStore.viewedPlayer?.gold || 0}
    </div>
  );
};

export const GoldView = observer(GoldViewBase);

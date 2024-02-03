import clsx from 'clsx';
import React from 'react';
import { GOLD_PER_REROLL } from '@tft-roller';

import IconReroll from '@src/assets/icons/common/reroll.svg?react';

import type { ShopButtonExtendedProps } from './ShopButton';
import { ShopButton } from './ShopButton';
import styles from './ShopButton.module.scss';

export const ShopButtonReroll: React.FC<ShopButtonExtendedProps> = ({
  className,
  ...restProps
}) => {
  return (
    <ShopButton
      className={clsx(styles.reroll, className)}
      cost={GOLD_PER_REROLL}
      icon={IconReroll}
      name="Reroll"
      {...restProps}
    />
  );
};

import React from 'react';
import clsx from 'clsx';

import { ReactComponent as IconReroll } from '@src/assets/icons/common/reroll.svg';
import { GOLD_PER_REROLL } from '@tft-roller';

import { ShopButton, ShopButtonExtendedProps } from './ShopButton';
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

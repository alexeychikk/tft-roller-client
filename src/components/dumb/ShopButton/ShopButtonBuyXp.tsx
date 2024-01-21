import clsx from 'clsx';
import React from 'react';
import { GOLD_PER_EXPERIENCE_BUY } from '@tft-roller';

import { ReactComponent as IconBuyXp } from '@src/assets/icons/common/buy_xp.svg';

import type { ShopButtonExtendedProps } from './ShopButton';
import { ShopButton } from './ShopButton';
import styles from './ShopButton.module.scss';

export const ShopButtonBuyXp: React.FC<ShopButtonExtendedProps> = ({
  className,
  ...restProps
}) => {
  return (
    <ShopButton
      className={clsx(styles.buyXp, className)}
      cost={GOLD_PER_EXPERIENCE_BUY}
      icon={IconBuyXp}
      name="Buy XP"
      {...restProps}
    />
  );
};

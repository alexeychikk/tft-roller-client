import React from 'react';
import clsx from 'clsx';

import { ReactComponent as IconBuyXp } from '@src/assets/icons/common/buy_xp.svg';
import { GOLD_PER_EXPERIENCE_BUY } from '@src/constants';

import { ShopButton, ShopButtonExtendedProps } from './ShopButton';
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

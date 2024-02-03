import clsx from 'clsx';
import React from 'react';

import IconCoin from '@src/assets/icons/common/coin.svg?react';
import type { ReactSvgIcon } from '@src/utils';

import styles from './ShopButton.module.scss';

export type ShopButtonProps = {
  className?: string;
  cost: number;
  disabled?: boolean;
  icon: ReactSvgIcon;
  name: React.ReactNode;
  onClick?: () => void;
};

export type ShopButtonExtendedProps = Omit<
  ShopButtonProps,
  'cost' | 'icon' | 'name'
>;

const ShopButtonBase: React.FC<ShopButtonProps> = (props) => {
  const { className, cost, icon: Icon, name, ...restProps } = props;
  return (
    <button className={clsx(styles.rootShopButton, className)} {...restProps}>
      <div className={styles.left}>
        <div className={styles.name}>{name}</div>
        <div className={styles.cost}>
          <IconCoin />
          {cost}
        </div>
      </div>
      <Icon className={styles.icon} />
    </button>
  );
};

export const ShopButton = React.memo(ShopButtonBase);

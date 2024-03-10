import { observer } from 'mobx-react-lite';
import React from 'react';

import { useTftStore } from '@src/state';

import styles from './GameProgress.module.scss';

export type GameProgressProps = {
  /* empty */
};

const GameProgressBase: React.FC<GameProgressProps> = () => {
  const tftStore = useTftStore();
  // if (!tftStore.viewedPlayer) return null;
  return (
    <div className={styles.rootGameProgress}>
      <div>{tftStore.game?.stage}</div>
      <div>{tftStore.game?.phase}</div>
    </div>
  );
};

export const GameProgress = observer(GameProgressBase);

import clsx from 'clsx';
import React from 'react';

import styles from './PlayerStats.module.scss';

export type PlayerStatsProps = {
  className?: string;
  health: number;
  isActive?: boolean;
  isDead?: boolean;
  nickname: string;
  onClick?: (sessionId: string) => void;
  sessionId: string;
};

const PlayerStatsBase: React.FC<PlayerStatsProps> = (props) => {
  return (
    <div
      className={clsx(
        styles.rootPlayerStats,
        props.isActive && styles.isActive,
        props.isDead && styles.isDead,
        props.className,
      )}
      onClick={() => props.onClick?.(props.sessionId)}
    >
      <div className={styles.nickname} title={props.nickname}>
        {props.nickname}
      </div>
      <div className={styles.health}>{props.health}</div>
      <div className={styles.avatar}>{props.isDead ? `😵` : `🙂`}</div>
    </div>
  );
};

export const PlayerStats = React.memo(PlayerStatsBase);

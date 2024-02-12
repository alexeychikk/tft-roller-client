import { observer } from 'mobx-react-lite';
import React from 'react';

import { PlayerStats } from '@src/components/dumb/PlayerStats';
import { useTftStore } from '@src/state';

import styles from './PlayersList.module.scss';

export type PlayersListProps = {
  /* empty */
};

const PlayersListBase: React.FC<PlayersListProps> = () => {
  const tftStore = useTftStore();
  if (!tftStore.game?.players.size) return null;

  return (
    <div className={styles.rootPlayersList}>
      {Array.from(tftStore.game.players.values(), (player) => (
        <PlayerStats
          key={player.sessionId}
          className={styles.playerStats}
          health={player.health}
          isActive={tftStore.viewedSessionId === player.sessionId}
          isDead={player.isDead}
          nickname={player.user.nickname}
          onClick={tftStore.setViewedPlayer}
          sessionId={player.sessionId}
        />
      ))}
    </div>
  );
};

export const PlayersList = observer(PlayersListBase);

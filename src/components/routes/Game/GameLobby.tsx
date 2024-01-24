import { observer } from 'mobx-react-lite';

import { Button, Form } from '@src/components/dumb/Form';
import { tftStore } from '@src/state';

import styles from './Game.module.scss';

export const GameLobby = observer(() => {
  if (!tftStore.game || !tftStore.currentRoom) return null;

  const canStart = tftStore.game.players.size > 1;

  return (
    <div className={styles.gameLobby}>
      <Form>
        <h1>Room {tftStore.currentRoom.metadata?.name}</h1>

        <table className={styles.playersTable}>
          <thead>
            <tr>
              <th>Players</th>
              <th></th>
              <th>
                {tftStore.currentRoom.clients} /{' '}
                {tftStore.currentRoom.maxClients}
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from(tftStore.game!.players.values(), (player) => (
              <tr key={player.sessionId}>
                <td>{player.user.nickname}</td>
                <td>{player.sessionId}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>

        {tftStore.isRoomOwner && (
          <Button disabled={!canStart} onClick={() => tftStore.start()}>
            Start
          </Button>
        )}
      </Form>
    </div>
  );
});

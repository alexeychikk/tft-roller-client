import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useAsyncFn } from 'react-use';
import type { GameMeta, RoomListingData } from '@tft-roller';

import { Button } from '@src/components/dumb/Form';
import { tftStore } from '@src/state';

import styles from './Lobby.module.scss';

export const RoomsTable = observer(() => {
  const navigate = useNavigate();

  const [joinState, joinGame] = useAsyncFn(
    async (room: RoomListingData<GameMeta>) => {
      const password =
        (room.metadata?.protected && prompt('Password')) || undefined;
      try {
        await tftStore.joinGame({ roomId: room.roomId, password });
        navigate('/game');
      } catch (error) {
        console.error(error);
        alert(
          `Couldn't join the room, please check the password or try again later`,
        );
      }
    },
    [],
  );

  return (
    <table className={styles.roomsTable}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Players</th>
          <th>Protected</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {Array.from(tftStore.allRooms.values(), (room) => (
          <tr key={room.roomId}>
            <td>{room.roomId}</td>
            <td>{room.metadata?.name}</td>
            <td>
              {room.clients} / {room.maxClients}
            </td>
            <td>{room.metadata?.protected ? 'Yes' : 'No'}</td>
            <td>
              <Button
                disabled={joinState.loading}
                onClick={() => joinGame(room)}
              >
                Join
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

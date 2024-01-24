import { observer } from 'mobx-react-lite';

import { Form } from '@src/components/dumb/Form';

import { CreateRoomForm } from './CreateRoomForm';
import { JoinByIdForm } from './JoinByIdForm';
import { RoomsTable } from './RoomsTable';
import styles from './Lobby.module.scss';

export const Lobby = observer(() => {
  return (
    <div className={styles.rootLobby}>
      <div className={styles.leftSection}>
        <CreateRoomForm />
        <JoinByIdForm />
      </div>

      <Form className={styles.roomsForm}>
        <h1>Available rooms</h1>
        <RoomsTable />
      </Form>
    </div>
  );
});

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'preact-iso';
import { useForm } from 'react-hook-form';
import { useAsyncFn } from 'react-use';
import { JoinGameRoomDto } from '@tft-roller';

import { Button, Form, Input } from '@src/components/dumb/Form';
import { useTftStore } from '@src/state';

import styles from './Lobby.module.scss';

const resolver = classValidatorResolver(JoinGameRoomDto);

export const JoinByIdForm = observer(() => {
  const tftStore = useTftStore();
  const { control, handleSubmit } = useForm<JoinGameRoomDto>({
    resolver,
    defaultValues: { roomId: '', password: '' },
  });
  const { route } = useLocation();

  const [joinState, joinGame] = useAsyncFn(async (data: JoinGameRoomDto) => {
    try {
      await tftStore.joinGame(data);
      route('/game');
    } catch (error) {
      console.error(error);
      alert(
        `Couldn't join the room, please check the password or try again later`,
      );
    }
  }, []);

  const onSubmit = handleSubmit(joinGame);

  return (
    <Form className={styles.joinRoomForm} onSubmit={onSubmit}>
      <h1>Join by room ID</h1>
      <Input control={control} name="roomId" label="Room ID" required />
      <Input control={control} name="password" label="Room password" />
      <Button type="submit" disabled={joinState.loading}>
        Join
      </Button>
    </Form>
  );
});

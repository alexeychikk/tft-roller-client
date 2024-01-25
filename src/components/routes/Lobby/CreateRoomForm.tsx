import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { observer } from 'mobx-react-lite';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAsyncFn } from 'react-use';
import { CreateGameDto } from '@tft-roller';

import { Button, Form, Input } from '@src/components/dumb/Form';
import { tftStore } from '@src/state';

import styles from './Lobby.module.scss';

const resolver = classValidatorResolver(CreateGameDto);

export const CreateRoomForm = observer(() => {
  const { control, handleSubmit } = useForm<CreateGameDto>({
    resolver,
    defaultValues: { name: '', password: '' },
  });
  const navigate = useNavigate();

  const placeholderName = useMemo(
    () => nanoid(11).replace(/[^a-zA-Z0-9]/g, ''),
    [],
  );

  const [createState, createGame] = useAsyncFn(async (data: CreateGameDto) => {
    try {
      const game = await tftStore.createGame({
        ...data,
        name: data.name?.trim() || placeholderName,
      });
      await tftStore.joinGame({ roomId: game.roomId, password: data.password });
      navigate('/game');
    } catch (error) {
      console.error(error);
      alert(`Couldn't create the room, please try again later`);
    }
  }, []);

  const onSubmit = handleSubmit(createGame);

  return (
    <Form className={styles.createRoomForm} onSubmit={onSubmit}>
      <h1>Create new room</h1>
      <Input
        control={control}
        name="name"
        label="Room name"
        placeholder={placeholderName}
      />
      <Input control={control} name="password" label="Room password" />
      <Button type="submit" disabled={createState.loading}>
        Create
      </Button>
    </Form>
  );
});

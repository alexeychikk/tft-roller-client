import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { observer } from 'mobx-react-lite';
import { nanoid } from 'nanoid';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAsyncFn } from 'react-use';
import { CreateGameDto } from '@tft-roller';

import { Button, Input } from '@src/components/dumb/Form';
import { tftStore } from '@src/state';

const resolver = classValidatorResolver(CreateGameDto);

export const Lobby: React.FC = observer(() => {
  const { control, handleSubmit } = useForm<CreateGameDto>({
    resolver,
    defaultValues: { name: '', password: '' },
  });
  const navigate = useNavigate();

  const placeholderName = useMemo(() => nanoid(10), []);

  const [createState, createGame] = useAsyncFn(async (data: CreateGameDto) => {
    const game = await tftStore.createGame({
      ...data,
      name: data.name?.trim() || placeholderName,
    });
    await tftStore.joinGame(game.roomId, { password: data.password });
    navigate('/game');
  }, []);

  const onSubmit = handleSubmit(createGame);

  return (
    <div>
      <form onSubmit={onSubmit}>
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
      </form>

      <br />

      <h1>Rooms:</h1>
      <ul>
        {Array.from(tftStore.allRooms.values(), (room) => (
          <li key={room.roomId}>
            <span>
              Name: {room.metadata?.name} #{room.roomId} ({room.name})
            </span>
            <span> | Owner: {room.metadata?.ownerId}</span>
            <button onClick={() => tftStore.joinGame(room.roomId, {})}>
              Join
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

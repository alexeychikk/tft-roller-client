import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { observer } from 'mobx-react-lite';
import { nanoid } from 'nanoid';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useAsyncFn } from 'react-use';
import { CreateGameOptions } from '@tft-roller';

import { Button, Input } from '@src/components/dumb/Form';
import { tftStore } from '@src/state';

const resolver = classValidatorResolver(CreateGameOptions);

export const Lobby: React.FC = observer(() => {
  const { control, handleSubmit } = useForm<CreateGameOptions>({
    resolver,
    defaultValues: { name: '' },
  });

  const placeholderName = useMemo(() => nanoid(10), []);

  const [createState, createGame] = useAsyncFn(
    async (data: CreateGameOptions) => {
      await tftStore.createGame({ name: placeholderName, ...data });
    },
    [],
  );

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
            <span>| Owner: {room.metadata?.ownerId}</span>
            <span>| Password: {room.metadata?.password}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});

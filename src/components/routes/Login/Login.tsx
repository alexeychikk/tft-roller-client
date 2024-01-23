import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAsyncFn } from 'react-use';
import { SignInAnonymouslyDto } from '@tft-roller';

import { Button, Input } from '@src/components/dumb/Form';
import { tftStore } from '@src/state';

import styles from './Login.module.scss';

const resolver = classValidatorResolver(SignInAnonymouslyDto);

export const Login: React.FC = observer(() => {
  const { control, handleSubmit } = useForm<SignInAnonymouslyDto>({
    resolver,
    defaultValues: { nickname: '' },
  });
  const navigate = useNavigate();

  const [joinState, joinLobby] = useAsyncFn(
    async (data: SignInAnonymouslyDto) => {
      await tftStore.signInAnonymously(data);
      await tftStore.joinLobby();
      navigate('/');
    },
    [navigate],
  );

  const onSubmit = handleSubmit(joinLobby);

  return (
    <form className={styles.rootLogin} onSubmit={onSubmit}>
      <h1 className={styles.title}>Enter the Lobby</h1>

      <Input
        control={control}
        name="nickname"
        label="Nickname"
        className={styles.input}
        disabled={joinState.loading}
      />

      <Button
        className={styles.button}
        type="submit"
        disabled={joinState.loading}
      >
        Play
      </Button>
    </form>
  );
});

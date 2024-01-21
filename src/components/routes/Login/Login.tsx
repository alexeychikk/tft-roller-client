import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAsyncFn } from 'react-use';
import { JoinLobbyOptions } from '@tft-roller';

import { tftStore } from '@src/state';

import styles from './Login.module.scss';

const resolver = classValidatorResolver(JoinLobbyOptions);

export const Login: React.FC = observer(() => {
  const { register, handleSubmit, formState } = useForm<JoinLobbyOptions>({
    resolver,
  });
  const navigate = useNavigate();

  const [joinState, joinLobby] = useAsyncFn(
    async (data: JoinLobbyOptions) => {
      await tftStore.joinLobby(data);
      navigate('/');
    },
    [navigate],
  );

  const onSubmit = handleSubmit(joinLobby);

  return (
    <form className={styles.rootLogin} onSubmit={onSubmit}>
      <h1 className={styles.title}>Your nickname</h1>

      <input
        className={styles.input}
        type="text"
        disabled={joinState.loading}
        {...register('name')}
      />
      <p className={styles.error}>{formState.errors.name?.message}</p>

      <button
        className={styles.button}
        type="submit"
        disabled={joinState.loading}
      >
        Enter
      </button>
    </form>
  );
});

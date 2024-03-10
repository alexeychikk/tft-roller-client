import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';
import { useAsyncFn } from 'react-use';
import { useLocation } from 'wouter';
import { SignInAnonymouslyDto } from '@tft-roller';

import { Button, Form, Input } from '@src/components/dumb/Form';
import { useTftStore } from '@src/state';

import styles from './Login.module.scss';

const resolver = classValidatorResolver(SignInAnonymouslyDto);

export const Login = observer(() => {
  const tftStore = useTftStore();
  const [location, navigate] = useLocation();
  const isAdminRoute = location === '/loginAsAdmin';

  const { control, handleSubmit } = useForm<SignInAnonymouslyDto>({
    resolver,
    defaultValues: {
      nickname: isAdminRoute ? 'admin' : '',
      password: isAdminRoute ? '' : undefined,
    },
  });

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
    <Form className={styles.rootLogin} onSubmit={onSubmit}>
      <h1>Enter the Lobby</h1>

      <Input
        control={control}
        name="nickname"
        label="Nickname"
        disabled={joinState.loading}
        required
      />

      {isAdminRoute && (
        <Input
          control={control}
          name="password"
          label="Password"
          disabled={joinState.loading}
          required
          type="password"
        />
      )}

      <Button type="submit" disabled={joinState.loading}>
        Play
      </Button>
    </Form>
  );
});

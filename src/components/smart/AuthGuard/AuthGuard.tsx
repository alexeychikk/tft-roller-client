import { observer } from 'mobx-react-lite';
import React from 'react';

import { tftStore } from '@src/state';
import { Redirect } from '../Redirect';

export type AuthGuardProps = {
  children: React.ReactNode;
};

export const AuthGuard = observer((props: AuthGuardProps) => {
  const authenticated = !!tftStore.lobby;
  return authenticated ? <>{props.children}</> : <Redirect to="/login" />;
});

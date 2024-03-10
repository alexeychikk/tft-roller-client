import { observer } from 'mobx-react-lite';
import React from 'react';
import { Redirect } from 'wouter';

import { useTftStore } from '@src/state';

export type AuthGuardProps = {
  children: React.ReactNode;
};

export const AuthGuard = observer((props: AuthGuardProps) => {
  const tftStore = useTftStore();
  const authenticated = !!tftStore.lobby;
  return authenticated ? <>{props.children}</> : <Redirect to="/login" />;
});

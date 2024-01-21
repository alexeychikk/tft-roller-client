import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navigate } from 'react-router-dom';

import { tftStore } from '@src/state';

export type AuthGuardProps = {
  children: React.ReactNode;
};

export const AuthGuard: React.FC<AuthGuardProps> = observer((props) => {
  const authenticated = !!tftStore.lobby;
  return authenticated ? props.children : <Navigate to="/login" />;
});

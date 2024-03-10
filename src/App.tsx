import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Switch, Redirect } from 'wouter';

import './App.scss';
import { useHtmlFontSize } from './components/hooks/useHtmlFontSize';
import { Game } from './components/routes/Game';
import { Lobby } from './components/routes/Lobby';
import { Login } from './components/routes/Login';
import { AuthGuard } from './components/smart/AuthGuard';
import { TftProvider } from './state';

export function App() {
  const isFontSizeReady = useHtmlFontSize();
  if (!isFontSizeReady) return null;

  return (
    <DndProvider backend={HTML5Backend}>
      <TftProvider>
        <Switch>
          <Route path="/game">
            <AuthGuard>
              <Game />
            </AuthGuard>
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/loginAsAdmin" component={Login} />
          <Route path="/">
            <AuthGuard>
              <Lobby />
            </AuthGuard>
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </TftProvider>
    </DndProvider>
  );
}

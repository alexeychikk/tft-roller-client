import { LocationProvider, Route, Router } from 'preact-iso';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './App.scss';
import { useHtmlFontSize } from './components/hooks/useHtmlFontSize';
import { Game } from './components/routes/Game';
import { Lobby } from './components/routes/Lobby';
import { Login } from './components/routes/Login';
import { AuthGuard } from './components/smart/AuthGuard';
import { Redirect } from './components/smart/Redirect';

export function App() {
  const isFontSizeReady = useHtmlFontSize();
  if (!isFontSizeReady) return null;

  return (
    <LocationProvider>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <Route
            path="/game"
            component={() => (
              <AuthGuard>
                <Game />
              </AuthGuard>
            )}
          />
          <Route path="/login" component={Login} />
          <Route path="/loginAsAdmin" component={Login} />
          <Route
            path="/"
            component={() => (
              <AuthGuard>
                <Lobby />
              </AuthGuard>
            )}
          />
          <Route default component={Redirect} />
        </Router>
      </DndProvider>
    </LocationProvider>
  );
}

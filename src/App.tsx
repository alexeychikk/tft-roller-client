import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { useHtmlFontSize } from './components/hooks/useHtmlFontSize';
import { Game } from './components/routes/Game';
import { Lobby } from './components/routes/Lobby';
import { Login } from './components/routes/Login';
import { AuthGuard } from './components/smart/AuthGuard';

export function App() {
  const isFontSizeReady = useHtmlFontSize();
  if (!isFontSizeReady) return null;

  return (
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <Routes>
          <Route
            path="/game"
            element={
              <AuthGuard>
                <Game />
              </AuthGuard>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <AuthGuard>
                <Lobby />
              </AuthGuard>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </DndProvider>
    </BrowserRouter>
  );
}

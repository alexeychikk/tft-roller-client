import { observer } from 'mobx-react-lite';
import { GameStatus } from '@tft-roller';

import { useTftStore } from '@src/state';

import { GameLobby } from './GameLobby';
import { GamePlay } from './GamePlay';

export const Game = observer(() => {
  const tftStore = useTftStore();

  switch (tftStore.game?.status) {
    case GameStatus.InLobby:
      return <GameLobby />;
    case GameStatus.InProgress:
      return <GamePlay />;
    default:
      return null;
  }
});

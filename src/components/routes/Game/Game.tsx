import { observer } from 'mobx-react-lite';
import { GameStatus } from '@tft-roller';

import { tftStore } from '@src/state';

import { GameLobby } from './GameLobby';
import { GamePlay } from './GamePlay';

export const Game = observer(() => {
  switch (tftStore.game?.status) {
    case GameStatus.InLobby:
      return <GameLobby />;
    case GameStatus.InProgress:
      return <GamePlay />;
    default:
      return null;
  }
});

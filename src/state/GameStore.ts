import { makeObservable, observable } from 'mobx';
import type { GameSchema } from '@tft-roller';
import { GameStatus } from '@tft-roller';

import { listenMap, listenPrimitive } from '@src/utils';

import { PlayerStore } from './PlayerStore';

export class GameStore {
  ownerSessionId = '';
  status: GameStatus = GameStatus.InLobby;
  players = new Map<string, PlayerStore>();

  constructor(game: GameSchema) {
    makeObservable(this, {
      ownerSessionId: observable,
      status: observable,
      players: observable,
    });

    listenPrimitive(game, this, 'ownerSessionId');
    listenPrimitive(game, this, 'status');
    listenMap(game, this, 'players', (player) => new PlayerStore(player));
  }
}

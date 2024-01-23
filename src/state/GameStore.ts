import { makeObservable, observable } from 'mobx';
import type { GameStatus, GameSchema } from '@tft-roller';

import { listenMap, listenPrimitive } from '@src/utils';

import { PlayerStore } from './PlayerStore';

export class GameStore {
  ownerId: string;
  status: GameStatus;
  players = new Map<string, PlayerStore>();

  constructor(game: GameSchema) {
    makeObservable(this, {
      players: observable,
    });

    listenPrimitive(game, this, 'ownerId');
    listenPrimitive(game, this, 'status');
    listenMap(game, this, 'players', (player) => new PlayerStore(player));
  }
}

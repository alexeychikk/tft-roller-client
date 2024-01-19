import { makeObservable, observable } from 'mobx';
import { GameSchema } from '@tft-roller';

import { listenMap } from '@src/utils';

import { PlayerStore } from './PlayerStore';

export class GameStore {
  players = new Map<string, PlayerStore>();

  constructor(game: GameSchema) {
    makeObservable(this, {
      players: observable,
    });

    listenMap(game, this, 'players', (player) => new PlayerStore(player));
  }
}

import { makeObservable, observable } from 'mobx';
import type { SchemaOf } from '@tft-roller';
import { Game, GamePhase, GameStatus } from '@tft-roller';

import { listenMap, listenPrimitive } from '@src/utils';

import { PlayerStore } from './PlayerStore';

export class GameStore extends Game {
  ownerSessionId = '';
  status = GameStatus.InLobby;
  stage = 0;
  phase = GamePhase.Preparation;
  players = new Map<string, PlayerStore>();

  constructor(game: SchemaOf<Game>) {
    super();

    makeObservable(this, {
      ownerSessionId: observable,
      status: observable,
      stage: observable,
      phase: observable,
      players: observable,
    });

    listenPrimitive(game, this, 'ownerSessionId');
    listenPrimitive(game, this, 'status');
    listenPrimitive(game, this, 'stage');
    listenPrimitive(game, this, 'phase');
    listenMap(game, this, 'players', (player) => new PlayerStore(player));
  }
}

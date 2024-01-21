import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { Client, Room } from 'colyseus.js';
import { GameSchema, UnitContext } from '@tft-roller';

import { GameStore } from './GameStore';

export class TftStore {
  client: Client | null = null;
  room: Room<GameSchema> | null = null;
  game: GameStore | null = null;
  sessionId: string | null = null;
  viewedPlayerId: string | null = null;

  constructor() {
    makeObservable(this, {
      game: observable,
      sessionId: observable,
      viewedPlayerId: observable,

      me: computed,

      connect: action,
      setViewedPlayer: action,
      viewPrevPlayer: action,
      viewNextPlayer: action,
      buyExperience: action,
      buyChampion: action,
      sellUnit: action,
      moveUnit: action,
      reroll: action,
    });
  }

  async connect() {
    const wsUrl = `${
      window.location.protocol.includes('https') ? 'wss' : 'ws'
    }://${import.meta.env.VITE_SERVER_HOST || window.location.hostname}:${
      import.meta.env.VITE_SERVER_PORT || window.location.port
    }`;
    this.client = new Client(wsUrl);
    this.room = await this.client.joinOrCreate('gameRoom', {}, GameSchema);
    this.room.onStateChange.once((state) => {
      console.log('state change', state.toJSON());
      runInAction(() => {
        this.game = new GameStore(state);
        this.sessionId = this.room!.sessionId;
        this.viewedPlayerId = this.sessionId;
      });
    });
  }

  get isViewingMe() {
    return !!(this.sessionId && this.viewedPlayerId === this.sessionId);
  }

  get isViewingEnemy() {
    return !!(this.viewedPlayerId && this.viewedPlayerId !== this.sessionId);
  }

  get me() {
    return (this.sessionId && this.game?.players.get(this.sessionId)) || null;
  }

  get viewedPlayer() {
    return (
      (this.viewedPlayerId && this.game?.players.get(this.viewedPlayerId)) ||
      null
    );
  }

  setViewedPlayer = (playerId: string) => {
    this.viewedPlayerId = playerId;
  };

  viewPrevPlayer = () => {
    if (!this.game?.players.size) return;
    const playerIds = Array.from(this.game.players.keys());
    const index = playerIds.indexOf(this.viewedPlayerId!);
    if (index === -1) return console.error('Player not found');
    this.viewedPlayerId =
      playerIds[(index - 1 + playerIds.length) % playerIds.length];
  };

  viewNextPlayer = () => {
    if (!this.game?.players.size) return;
    const playerIds = Array.from(this.game.players.keys());
    const index = playerIds.indexOf(this.viewedPlayerId!);
    if (index === -1) return console.error('Player not found');
    this.viewedPlayerId = playerIds[(index + 1) % playerIds.length];
  };

  buyExperience = () => {
    if (!this.isViewingMe) return;
    console.log('buyExperience');
    this.room!.send('buyExperience');
  };

  buyChampion = (index: number) => {
    if (!this.isViewingMe) return;
    console.log('buyChampion', index);
    this.room!.send('buyChampion', { index });
  };

  sellUnit = (unit: UnitContext) => {
    if (!this.isViewingMe) return;
    console.log('sellUnit', unit);
    this.room!.send('sellUnit', unit);
  };

  moveUnit = (source: UnitContext, dest: UnitContext) => {
    if (!this.isViewingMe) return;
    console.log('moveUnit', source, dest);
    this.room!.send('moveUnit', { source, dest });
  };

  reroll = () => {
    if (!this.isViewingMe) return;
    console.log('reroll');
    this.room!.send('reroll');
  };
}

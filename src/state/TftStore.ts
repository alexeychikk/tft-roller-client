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

  constructor() {
    makeObservable(this, {
      game: observable,
      sessionId: observable,

      me: computed,

      connect: action,
      buyExperience: action,
      buyChampion: action,
      sellUnit: action,
      moveUnit: action,
      reroll: action,
    });
  }

  async connect() {
    this.client = new Client('ws://localhost:2567');
    this.room = await this.client.joinOrCreate('gameRoom', {}, GameSchema);
    this.room.onStateChange.once((state) => {
      console.log('state change', state.toJSON());
      runInAction(() => {
        this.game = new GameStore(state);
        this.sessionId = this.room!.sessionId;
      });
    });
  }

  get me() {
    return (this.sessionId && this.game?.players.get(this.sessionId)) || null;
  }

  buyExperience = () => {
    if (!this.room) return console.error('No room');
    console.log('buyExperience');
    this.room.send('buyExperience');
  };

  buyChampion = (index: number) => {
    if (!this.room) return console.error('No room');
    console.log('buyChampion', index);
    this.room.send('buyChampion', { index });
  };

  sellUnit = (unit: UnitContext) => {
    if (!this.room) return console.error('No room');
    console.log('sellUnit', unit);
    this.room.send('sellUnit', unit);
  };

  moveUnit = (source: UnitContext, dest: UnitContext) => {
    if (!this.room) return console.error('No room');
    console.log('moveUnit', source, dest);
    this.room.send('moveUnit', { source, dest });
  };

  reroll = () => {
    if (!this.room) return console.error('No room');
    console.log('reroll');
    this.room.send('reroll');
  };
}

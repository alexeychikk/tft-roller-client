import type { Room, RoomAvailable } from 'colyseus.js';
import { Client } from 'colyseus.js';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import type {
  CreateGameOptions,
  GameOptions,
  JoinGameOptions,
  JoinLobbyOptions,
  UnitContext,
} from '@tft-roller';
import {
  RoomType,
  GameSchema,
  LobbyEventType,
  GameMessageType,
  LobbyMessageType,
} from '@tft-roller';

import { GameStore } from './GameStore';

export class TftStore {
  client: Client | null = null;
  lobby: Room | null = null;
  allRooms: Map<string, RoomAvailable<GameOptions>> = new Map();
  createGameOptions: CreateGameOptions | null = null;
  room: Room<GameSchema> | null = null;
  game: GameStore | null = null;
  sessionId: string | null = null;
  viewedPlayerId: string | null = null;

  constructor() {
    makeObservable(this, {
      lobby: observable,
      allRooms: observable,
      game: observable,
      sessionId: observable,
      viewedPlayerId: observable,

      me: computed,

      joinLobby: action,
      joinGame: action,
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

  async joinLobby(options: JoinLobbyOptions) {
    const wsUrl = `${
      window.location.protocol.includes('https') ? 'wss' : 'ws'
    }://${import.meta.env.VITE_SERVER_HOST || window.location.hostname}:${
      import.meta.env.VITE_SERVER_PORT || window.location.port
    }`;
    this.client = new Client(wsUrl);

    const lobby = await this.client.join(RoomType.Lobby, options);

    lobby.onMessage(LobbyEventType.Rooms, (rooms: RoomAvailable[]) => {
      console.info('rooms', rooms);
      this.allRooms = new Map(rooms.map((room) => [room.roomId, room]));
    });

    lobby.onMessage(LobbyEventType.Add, ([roomId, room]) => {
      console.info('room added', roomId, room);
      this.allRooms.set(roomId, room);
    });

    lobby.onMessage(LobbyEventType.Remove, (roomId) => {
      console.info('room removed', roomId);
      this.allRooms.delete(roomId);
    });

    lobby.onMessage(
      LobbyMessageType.CreateGame,
      (message: { roomId: string }) => {
        console.info('create game', message);
        this.joinGame(message.roomId, this.createGameOptions!);
      },
    );

    this.lobby = lobby;
  }

  async createGame(options: CreateGameOptions) {
    if (!this.lobby) return;
    this.createGameOptions = options;
    this.lobby.send(LobbyMessageType.CreateGame, this.createGameOptions);
  }

  async joinGame(roomId: string, options: JoinGameOptions) {
    if (!this.client) return;
    this.room = await this.client.joinById(roomId, options, GameSchema);
    this.room.onStateChange.once((state) => {
      console.info('state change', state.toJSON());
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
    console.info(GameMessageType.BuyExperience);
    this.room!.send(GameMessageType.BuyExperience);
  };

  buyChampion = (index: number) => {
    if (!this.isViewingMe) return;
    console.info(GameMessageType.BuyChampion, index);
    this.room!.send(GameMessageType.BuyChampion, { index });
  };

  sellUnit = (unit: UnitContext) => {
    if (!this.isViewingMe) return;
    console.info(GameMessageType.SellUnit, unit);
    this.room!.send(GameMessageType.SellUnit, unit);
  };

  moveUnit = (source: UnitContext, dest: UnitContext) => {
    if (!this.isViewingMe) return;
    console.info(GameMessageType.MoveUnit, source, dest);
    this.room!.send(GameMessageType.MoveUnit, { source, dest });
  };

  reroll = () => {
    if (!this.isViewingMe) return;
    console.info(GameMessageType.Reroll);
    this.room!.send(GameMessageType.Reroll);
  };
}

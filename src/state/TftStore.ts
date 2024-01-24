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
  CreateGameDto,
  GameMeta,
  GameRoomEntity,
  JoinGameRoomDto,
  SignInAnonymouslyDto,
  UnitContext,
} from '@tft-roller';
import {
  RoomType,
  GameSchema,
  LobbyEventType,
  GameMessageType,
} from '@tft-roller';

import { HOSTNAME, IS_SECURE, PORT } from '@src/constants';

import { GameStore } from './GameStore';

export class TftStore {
  client: Client | null = null;
  lobby: Room | null = null;
  allRooms: Map<string, RoomAvailable<GameMeta>> = new Map();
  gameRoom: Room<GameSchema> | null = null;
  game: GameStore | null = null;
  sessionId: string | null = null;
  viewedPlayerId: string | null = null;

  constructor() {
    makeObservable(this, {
      client: observable,
      lobby: observable,
      allRooms: observable,
      gameRoom: observable,
      game: observable,
      sessionId: observable,
      viewedPlayerId: observable,

      currentRoom: computed,
      me: computed,
      isViewingMe: computed,
      isViewingEnemy: computed,
      isRoomOwner: computed,
      viewedPlayer: computed,

      signInAnonymously: action,
      joinLobby: action,
      createGame: action,
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

  async signInAnonymously(dto: SignInAnonymouslyDto) {
    this.client = new Client({
      hostname: HOSTNAME,
      port: PORT,
      secure: IS_SECURE,
    });
    await this.client?.auth.signInAnonymously(dto);
  }

  async joinLobby() {
    if (!this.client) return;
    const lobby = await this.client.join(RoomType.Lobby);

    lobby.onMessage(LobbyEventType.Rooms, (rooms: RoomAvailable[]) => {
      runInAction(() => {
        console.info('rooms', rooms);
        this.allRooms = new Map(rooms.map((room) => [room.roomId, room]));
      });
    });

    lobby.onMessage(LobbyEventType.Add, ([roomId, room]) => {
      runInAction(() => {
        console.info('room added', roomId, room);
        this.allRooms.set(roomId, room);
      });
    });

    lobby.onMessage(LobbyEventType.Remove, (roomId) => {
      runInAction(() => {
        console.info('room removed', roomId);
        this.allRooms.delete(roomId);
      });
    });

    this.lobby = lobby;
  }

  async createGame(dto: CreateGameDto): Promise<GameRoomEntity> {
    if (!this.client) throw new Error('Client not initialized');
    const { data } = await this.client.http.post<GameRoomEntity>('/games', {
      body: dto,
    });
    return data;
  }

  async joinGame(dto: JoinGameRoomDto) {
    if (!this.client) return;
    this.gameRoom = await this.client.joinById(dto.roomId, dto, GameSchema);
    this.gameRoom.onStateChange.once((state) => {
      console.info('state change', state.toJSON());
      runInAction(() => {
        this.game = new GameStore(state);
        this.sessionId = this.gameRoom!.sessionId;
        this.viewedPlayerId = this.sessionId;
      });
    });
  }

  get currentRoom() {
    return (this.gameRoom && this.allRooms.get(this.gameRoom.roomId)) || null;
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

  get isRoomOwner() {
    return !!(this.me && this.game?.ownerSessionId === this.me.sessionId);
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

  start = () => {
    if (!this.isRoomOwner) return;
    console.info(GameMessageType.Start);
    this.gameRoom!.send(GameMessageType.Start);
  };

  buyExperience = () => {
    if (!this.isViewingMe) return;
    console.info(GameMessageType.BuyExperience);
    this.gameRoom!.send(GameMessageType.BuyExperience);
  };

  buyChampion = (index: number) => {
    if (!this.isViewingMe) return;
    console.info(GameMessageType.BuyChampion, index);
    this.gameRoom!.send(GameMessageType.BuyChampion, { index });
  };

  sellUnit = (unit: UnitContext) => {
    if (!this.isViewingMe) return;
    console.info(GameMessageType.SellUnit, unit);
    this.gameRoom!.send(GameMessageType.SellUnit, unit);
  };

  moveUnit = (source: UnitContext, dest: UnitContext) => {
    if (!this.isViewingMe) return;
    console.info(GameMessageType.MoveUnit, source, dest);
    this.gameRoom!.send(GameMessageType.MoveUnit, { source, dest });
  };

  reroll = () => {
    if (!this.isViewingMe) return;
    console.info(GameMessageType.Reroll);
    this.gameRoom!.send(GameMessageType.Reroll);
  };
}

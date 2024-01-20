import { Player, PlayerSchema } from '@tft-roller';
import { makeObservable, observable } from 'mobx';
import { UnitsGridStore } from './UnitsGridStore';
import { listenArray, listenPrimitive } from '@src/utils';

export class PlayerStore extends Player {
  constructor(player: PlayerSchema) {
    super({
      ...player,
      shopChampionNames: player.shopChampionNames
        ? Array.from(player.shopChampionNames)
        : [],
      bench: new UnitsGridStore(player.bench),
      table: new UnitsGridStore(player.table),
    });
    makeObservable(this, {
      sessionId: observable,
      isAdmin: observable,
      gold: observable,
      experience: observable,
      shopChampionNames: observable,
      bench: observable,
      table: observable,
    });

    listenPrimitive(player, this, 'gold');
    listenPrimitive(player, this, 'experience');
    listenArray(player, this, 'shopChampionNames');
  }
}

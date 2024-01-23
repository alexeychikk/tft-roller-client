import { makeObservable, observable } from 'mobx';
import type { PlayerSchema } from '@tft-roller';
import { Player } from '@tft-roller';

import { listenArray, listenPrimitive } from '@src/utils';

import { UnitsGridStore } from './UnitsGridStore';

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

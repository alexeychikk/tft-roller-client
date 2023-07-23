import { Champion } from '@src/constants';
import { Unit } from './Unit';
import { UnitContext } from './UnitsGrid';

export enum DndItemTypes {
  Champion = 'champion',
  Unit = 'unit',
}

export type DndItemUnit = UnitContext & {
  unit: Unit;
};

export type DndItemChampion = {
  champion: Champion;
  shopIndex: number;
};

export type DndItem = DndItemUnit | DndItemChampion;

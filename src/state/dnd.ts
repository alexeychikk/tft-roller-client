import { UnitContext } from './UnitsGrid';

export enum DndItemTypes {
  Champion = 'champion',
  Unit = 'unit',
}

export type DndItemUnit = UnitContext;

export type DndItemChampion = {
  shopIndex: number;
};

export type DndItem = DndItemUnit | DndItemChampion;

import { UnitContext } from '@tft-roller';

export enum DndItemType {
  Champion = 'champion',
  Unit = 'unit',
}

export type DndItemUnit = UnitContext;

export type DndItemChampion = {
  shopIndex: number;
};

export type DndItem = DndItemUnit | DndItemChampion;

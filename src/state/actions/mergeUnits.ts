import { TftContextState } from '../TftContext';

export function mergeUnits(
  state: TftContextState,
  {
    championName,
    stars = 1,
    minUnitsAmount = 3,
  }: { championName: string; stars?: number; minUnitsAmount?: number },
): TftContextState {
  const benchCoords = state.bench.getCoordsOfUnitsOfStars(
    championName,
    3,
    stars,
  );
  const tableCoords = state.table.getCoordsOfUnitsOfStars(
    championName,
    3,
    stars,
  );
  if (benchCoords.length + tableCoords.length < minUnitsAmount) {
    return state;
  }

  if (tableCoords.length) {
    const [firstUnitCoords, ...restCoords] = tableCoords;
    state = {
      ...state,
      bench: state.bench.removeUnits(benchCoords),
      table: state.table.removeUnits(restCoords).upgradeUnit(firstUnitCoords),
    };
  } else {
    const [firstUnitCoords, ...restCoords] = benchCoords;
    state = {
      ...state,
      table: state.table.removeUnits(tableCoords),
      bench: state.bench.removeUnits(restCoords).upgradeUnit(firstUnitCoords),
    };
  }

  return mergeUnits(state, { championName, stars: stars + 1 });
}

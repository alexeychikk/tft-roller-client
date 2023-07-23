import React from 'react';
import { times } from 'lodash-es';

import { useTftState } from '@src/state';
import { UnitAvatar } from '@src/components/dumb/UnitAvatar';
import { UnitSlot } from '@src/components/dumb/UnitSlot';

import './Table.styles.css';

export type TableProps = {};

const TableBase: React.FC<TableProps> = (props) => {
  const { table } = useTftState();
  return (
    <div className="tft__table">
      {times(table.height, (y) => {
        return (
          <div key={y} className="tft__table-row">
            {times(table.width, (x) => {
              const unit = table.getUnit({ x, y });
              return (
                <div key={x} className="tft__table-col">
                  <UnitSlot grid={table} x={x} y={y}>
                    {unit && (
                      <UnitAvatar grid={table} unit={unit} x={x} y={y} />
                    )}
                  </UnitSlot>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export const Table = React.memo(TableBase);

import React from 'react';
import { times } from 'lodash-es';

import { useTftState } from '@src/state';

import { TableSlot } from './TableSlot';
import './Table.styles.css';

export type TableProps = {
  /* empty */
};

const TableBase: React.FC<TableProps> = () => {
  const { table } = useTftState();
  return (
    <div className="tft__table">
      {times(table.height, (y) => {
        return (
          <div key={y} className="tft__table-row">
            {times(table.width, (x) => {
              return <TableSlot key={x} x={x} y={y} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export const Table = React.memo(TableBase);

import React from 'react';
import { times } from 'lodash-es';
import { observer } from 'mobx-react-lite';

import { tftStore } from '@src/state';

import { TableSlot } from './TableSlot';
import './Table.styles.css';

export type TableProps = {
  /* empty */
};

const TableBase: React.FC<TableProps> = () => {
  return (
    <div className="tft__table">
      {times(tftStore.table.height, (y) => {
        return (
          <div key={y} className="tft__table-row">
            {times(tftStore.table.width, (x) => {
              return <TableSlot key={x} x={x} y={y} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export const Table = observer(TableBase);

import React from 'react';
import { observer } from 'mobx-react-lite';

import { tftStore } from '@src/state';

import { TableSlot } from './TableSlot';
import styles from './Table.module.scss';

export type TableProps = {
  /* empty */
};

const TableBase: React.FC<TableProps> = () => {
  return (
    <div className={styles.rootTable}>
      {Array.from({ length: tftStore.table.height }, (_, y) => {
        return (
          <div key={y} className={styles.row}>
            {Array.from({ length: tftStore.table.width }, (_, x) => {
              return <TableSlot className={styles.slot} key={x} x={x} y={y} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export const Table = observer(TableBase);

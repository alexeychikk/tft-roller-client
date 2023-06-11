import React from 'react';

import './Table.styles.css';

export type TableProps = {};

const TableBase: React.FC<TableProps> = (props) => {
  return <div className="tft__table">Table</div>;
};

export const Table = React.memo(TableBase);

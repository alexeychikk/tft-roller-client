import React from 'react';

export type TableProps = {};

const TableBase: React.FC<TableProps> = (props) => {
  return <div>Table</div>;
};

export const Table = React.memo(TableBase);

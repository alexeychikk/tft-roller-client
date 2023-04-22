import React from 'react';
import { useContext } from 'react';

export type DeskProps = {};

const DeskBase: React.FC<DeskProps> = (props) => {
  return <div>Desk</div>;
};

export const Desk = React.memo(DeskBase);

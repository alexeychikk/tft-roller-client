import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './App.css';
import { Table } from './components/smart/Table';
import { Bench } from './components/smart/Bench';
import { Shop } from './components/smart/Shop';
import { Comps } from './components/smart/Comps';

import { TftProvider } from './state';

export function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <TftProvider>
        <Table />
        <Bench />
        <Shop />
        <Comps />
      </TftProvider>
    </DndProvider>
  );
}

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './App.scss';

import { DragLayer } from './components/smart/DragLayer';
import { InputListener } from './components/smart/InputListener';
import { Table } from './components/smart/Table';
import { Bench } from './components/smart/Bench';
import { Shop } from './components/smart/Shop';
import { Comps } from './components/smart/Comps';

export function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <InputListener />
      <Table />
      <Bench />
      <Shop />
      <Comps />
      <DragLayer />
    </DndProvider>
  );
}

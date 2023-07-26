import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './App.css';

import { InputListener } from './components/smart/InputListener';
import { Table } from './components/smart/Table';
import { Bench } from './components/smart/Bench';
import { Shop } from './components/smart/Shop';
import { Comps } from './components/smart/Comps';
import { DragLayer } from './components/smart/DragLayer';

export function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <InputListener />
      <DragLayer />
      <Table />
      <Bench />
      <Shop />
      <Comps />
    </DndProvider>
  );
}

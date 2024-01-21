import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './App.scss';
import { Bench } from './components/smart/Bench';
import { Comps } from './components/smart/Comps';
import { DragLayer } from './components/smart/DragLayer';
import { InputListener } from './components/smart/InputListener';
import { Shop } from './components/smart/Shop';
import { Table } from './components/smart/Table';
import { tftStore } from './state';

export function App() {
  useEffect(() => {
    tftStore.connect();
  }, []);

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

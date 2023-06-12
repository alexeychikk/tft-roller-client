import './App.css';
import { Table } from './components/Table';
import { Desk } from './components/Desk';
import { Shop } from './components/Shop';
import { Comps } from './components/Comps';

import { TftProvider } from './state';

export function App() {
  return (
    <TftProvider>
      <Table />
      <Desk />
      <Shop />
      <Comps />
    </TftProvider>
  );
}

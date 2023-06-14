import './App.css';
import { Table } from './components/Table';
import { Bench } from './components/Bench';
import { Shop } from './components/Shop';
import { Comps } from './components/Comps';

import { TftProvider } from './state';

export function App() {
  return (
    <TftProvider>
      <Table />
      <Bench />
      <Shop />
      <Comps />
    </TftProvider>
  );
}

import './App.css';
import { Table } from './components/smart/Table';
import { Bench } from './components/smart/Bench';
import { Shop } from './components/smart/Shop';
import { Comps } from './components/smart/Comps';

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

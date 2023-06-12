import './App.css';
import { Table } from './components/Table';
import { Desk } from './components/Desk';
import { Shop } from './components/Shop';
import { Comps } from './components/Comps';

import { TftContext } from './state';

export function App() {
  return (
    <TftContext.Provider value={{ experience: 14, gold: 35 }}>
      <Table />
      <Desk />
      <Shop />
      <Comps />
    </TftContext.Provider>
  );
}

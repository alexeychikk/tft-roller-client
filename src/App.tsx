import './App.css';
import { Table } from './components/Table';
import { Desk } from './components/Desk';
import { GoldBuckets } from './components/GoldBuckets';

import { TftContext } from './state';

export function App() {
  return (
    <TftContext.Provider value={{ experience: 0, gold: 0 }}>
      <GoldBuckets />
      <Table />
      <Desk />
      {/* <Shop /> */}
      {/* <Comps /> */}
    </TftContext.Provider>
  );
}

import 'reflect-metadata';
import './utils/transpilerCheck';
import ReactDOM from 'react-dom/client';

import { App } from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />,
);

import 'reflect-metadata';
import './utils/transpilerCheck';
import { render } from 'react-dom';

import { App } from './App';

render(<App />, document.getElementById('root') as HTMLElement);

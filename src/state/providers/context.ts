import { createContext } from 'react';

import type { TftStore } from '../stores/TftStore';

export const TftContext = createContext<TftStore | null>(null);

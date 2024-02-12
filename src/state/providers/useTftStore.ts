import { useContext } from 'react';

import type { TftStore } from '../stores/TftStore';

import { TftContext } from './context';

export function useTftStore(): TftStore {
  return useContext(TftContext)!;
}

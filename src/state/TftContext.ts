import React from 'react';

export type TftContextType = {
  gold: number;
  experience: number;
};

export const TftContext = React.createContext<TftContextType>({
  gold: 0,
  experience: 0,
});

import { createContext } from 'react';
import { IContext } from './types';

export const Context: React.Context<IContext> = createContext<IContext>({});

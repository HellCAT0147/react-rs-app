import React from 'react';

function initContextPlug(value: number): void {
  console.log(value);
}
export const LimitContext = React.createContext(initContextPlug);

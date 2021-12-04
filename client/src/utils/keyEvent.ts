import { KeyboardEvent } from 'react';

export const keyPressUtils = (
  e: KeyboardEvent<HTMLElement>,
  key: string,
  callback: () => void
) => {
  console.log(key);
  if (e.key === key) callback();
};

export const preventEnterKeyEvent = (
  e: KeyboardEvent<HTMLElement>,
  mode: 'hard' | 'soft' | 'both'
) => {
  switch (mode) {
    case 'hard':
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
      }
      break;
    case 'soft':
      if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
      }
      break;
    case 'both':
      if (e.key === 'Enter') {
        e.preventDefault();
      }
      break;

    default:
      break;
  }
};

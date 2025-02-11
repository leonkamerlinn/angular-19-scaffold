import { InjectionToken } from '@angular/core';

export const HELLO_WORLD = new InjectionToken('Hello', {
  providedIn: 'root',
  factory: () => {
    return ' Some message';
  },
});

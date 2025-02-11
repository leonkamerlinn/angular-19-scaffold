/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionService {
  setSession(key: string, obj: any): void {
    return localStorage.setItem(key, JSON.stringify(obj));
  }

  getSession<T>(key: string): T | null {
    if (this.hasItem(key)) {
      return JSON.parse(this.getItem(key) as string) as T;
    }

    return null;
  }

  clear(): void {
    return localStorage.clear();
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  hasItem(key: string): boolean {
    return this.getItem(key) !== null;
  }

  removeItem(key: string): boolean {
    if (this.hasItem(key)) {
      localStorage.removeItem(key);

      return true;
    }

    return false;
  }
}

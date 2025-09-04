import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionService {
  setSession<T>(key: string, obj: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(obj));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      throw new Error('Failed to save session data');
    }
  }

  getSession<T>(key: string): T | null {
    try {
      if (this.hasItem(key)) {
        const item = this.getItem(key);
        return item ? JSON.parse(item) as T : null;
      }
      return null;
    } catch (error) {
      console.error('Error parsing session data:', error);
      return null;
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error getting item from localStorage:', error);
      return null;
    }
  }

  hasItem(key: string): boolean {
    return this.getItem(key) !== null;
  }

  removeItem(key: string): boolean {
    try {
      if (this.hasItem(key)) {
        localStorage.removeItem(key);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error removing item from localStorage:', error);
      return false;
    }
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export class Memoization {
  private static INSTANCE: Memoization | null = null;
  private readonly _hashMap: Map<string, any>;

  constructor() {
    this._hashMap = new Map<string, any>();
  }

  setValue<T>(key: string, value: T, override = true): boolean {
    if (override || !this._hashMap.has(key)) {
      this._hashMap.set(key, value as T);

      return true;
    }

    return false;
  }
  getValue<T>(key: string, value?: T): T {
    if (!this._hashMap.has(key)) {
      this._hashMap.set(key, value as T);
    }

    return this._hashMap.get(key) as T;
  }

  public static getInstance(): Memoization {
    if (Memoization.INSTANCE === null) {
      Memoization.INSTANCE = new Memoization();
    }

    return Memoization.INSTANCE;
  }
}

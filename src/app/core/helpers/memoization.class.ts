export class Memoization {
  private static INSTANCE: Memoization | null = null;
  private readonly _hashMap: Map<string, unknown>;

  private constructor() {
    this._hashMap = new Map<string, unknown>();
  }

  setValue<T>(key: string, value: T, override = true): boolean {
    if (override || !this._hashMap.has(key)) {
      this._hashMap.set(key, value);

      return true;
    }

    return false;
  }

  /**
   * Retrieves a value from the cache.
   * @param key The key of the value to retrieve.
   * @returns The cached value or undefined if the key is not found.
   */
  getValue<T>(key: string): T | undefined {
    return this._hashMap.get(key) as T | undefined;
  }

  /**
   * Retrieves a value from the cache. If the key is not found,
   * it uses the defaultValueProvider to compute, store, and return a default value.
   * @param key The key of the value to retrieve.
   * @param defaultValueProvider A function that provides the default value if the key is not found.
   * @returns The cached value or the newly computed and cached default value.
   */
  getOrSet<T>(key: string, defaultValueProvider: () => T): T {
    if (!this._hashMap.has(key)) {
      this._hashMap.set(key, defaultValueProvider());
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

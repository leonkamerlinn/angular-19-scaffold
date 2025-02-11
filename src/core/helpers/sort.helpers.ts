/* eslint-disable @typescript-eslint/no-explicit-any */
import { extractDeepPropertyByMapKey, isString, isUndefined } from '@app-core/helpers/helpers';

/**
 * Compares the values of the passed property of objects
 *
 * @param prop
 * @param asc
 * @param a
 * @param b
 */
export const orderCompare = (prop: string, asc: boolean, a: any, b: any): number => {
  try {
    const first = extractDeepPropertyByMapKey(a, prop);
    const second = extractDeepPropertyByMapKey(b, prop);

    if (first === second) {
      return 0;
    }

    if (isUndefined(first) || first === '') {
      return 1;
    }

    if (isUndefined(second) || second === '') {
      return -1;
    }

    if (isString(first) && isString(second)) {
      const pos = first.toLowerCase().localeCompare(second.toLowerCase());

      return asc ? pos : -pos;
    }

    return asc ? first - second : second - first;
  } catch {
    return 0;
  }
};

/** Sort 2 strings or numbers */
export const simpleSort = (a: string | number, b: string | number): number => {
  return isString(a) && isString(b)
    ? (a as string).toLowerCase().localeCompare((b as string).toLowerCase())
    : (a as number) - (b as number);
};

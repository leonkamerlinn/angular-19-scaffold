/* eslint-disable @typescript-eslint/no-explicit-any */

import * as _ from 'lodash';

export const isUndefined = (value: any): boolean => typeof value === 'undefined';

export const isNull = (value: any): boolean => value === null;

export const isFunction = (value: any): boolean => typeof value === 'function';

export const isNumber = (value: any): boolean => typeof value === 'number';

export const isString = (value: any): boolean => typeof value === 'string';

export const isBoolean = (value: any): boolean => typeof value === 'boolean';

export const isObject = (value: any): boolean => value !== null && typeof value === 'object';

export const isNumberFinite = (value: any): boolean => isNumber(value) && isFinite(value);

export const isVowel = (letter: string): boolean => {
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  return vowels.indexOf(letter) !== -1;
};

export const applyPrecision = (num: number, precision: number): number => {
  if (precision <= 0) {
    return Math.round(num);
  }

  const tho = 10 ** precision;

  return Math.round(num * tho) / tho;
};

export const extractDeepPropertyByMapKey = (obj: any, map: string): any => {
  const keys = map.split('.');
  const head = keys.shift();

  return keys.reduce(
    (prop: any, key: string) => {
      return !isUndefined(prop) && !isNull(prop) && !isUndefined(prop[key]) ? prop[key] : undefined;
    },
    obj[head || '']
  );
};

export const getInputEventValue = (e: any): string => {
  return e.target.value;
};

export const extractDeepPropertyByParentMapKey = (obj: any, map: string): any => {
  const keys = map.split('.');
  const tail = keys.pop();
  const props = extractDeepPropertyByMapKey(obj, keys.join('.'));

  return { props, tail };
};

export const getKeysTwoObjects = (obj: any, other: any): any =>
  [...Object.keys(obj), ...Object.keys(other)].filter((key, index, array) => array.indexOf(key) === index);

export const isDeepEqual = (obj: any, other: any): any => {
  if (!isObject(obj) || !isObject(other)) {
    return obj === other;
  }

  return getKeysTwoObjects(obj, other).every((key: any): boolean => {
    if (!isObject(obj[key]) && !isObject(other[key])) {
      return obj[key] === other[key];
    }
    if (!isObject(obj[key]) || !isObject(other[key])) {
      return false;
    }

    return isDeepEqual(obj[key], other[key]);
  });
};

export const DISTINCT_UNTIL_CHANGED = (obj1: any, obj2: any): boolean => _.isEqual(obj1, obj2);

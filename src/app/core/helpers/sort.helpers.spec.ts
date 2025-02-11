import { orderCompare } from '@app-core/helpers/sort.helpers';

describe('orderCompare function', () => {
  it('works', () => {
    expect(orderCompare('a', true, { a: 100 }, { a: 200 })).toBeLessThan(0);
    expect(orderCompare('a', true, { a: 100 }, { a: 100 })).toEqual(0);
    expect(orderCompare('a', true, { a: 200 }, { a: 100 })).toBeGreaterThan(0);

    expect(orderCompare('a', false, { a: 100 }, { a: 200 })).toBeGreaterThan(0);
    expect(orderCompare('a', false, { a: 100 }, { a: 100 })).toEqual(0);
    expect(orderCompare('a', false, { a: 200 }, { a: 100 })).toBeLessThan(0);
  });

  it('should sort props that are numbers', () => {
    const numbers = [
      {
        prop: 4,
      },
      {
        prop: 3,
      },
      {
        prop: 1,
      },
      {
        prop: 2,
      },
    ];

    expect(numbers.sort((a, b) => orderCompare('prop', true, a, b))).toEqual([
      {
        prop: 1,
      },
      {
        prop: 2,
      },
      {
        prop: 3,
      },
      {
        prop: 4,
      },
    ]);
  });
});

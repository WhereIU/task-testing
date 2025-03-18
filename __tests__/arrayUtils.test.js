import fc from 'fast-check';

import {
  removeDuplicates,
  sortNumbers,
  sumPositiveNumbers,
  groupByParity,
  findCommonElements,
} from '../arrayUtils.js';

describe('removeDuplicates', () => {
  test('удаление дубликатов с массива', () => {
    fc.assert(
      fc.property(fc.array(fc.integer(), fc.string(), fc.float()), (arr) => {
        const funcResult = removeDuplicates(arr);
        const setResult = new Set(funcResult);
        expect(funcResult.length).toBe(setResult.size); 
        expect(new Set(arr)).toEqual(setResult);
      })
    );
  });
});

describe('sortNumbers', () => {
  test('сортировка чисел по возрастанию', () => {
    fc.assert(
      fc.property(fc.array(fc.integer(), fc.float()), (arr) => {
        const sorted = sortNumbers(arr);
        for (let i = 1; i < sorted.length; i += 1) {
          expect(sorted[i - 1]).toBeLessThanOrEqual(sorted[i]);
        }
      })
    );
  });
});

describe('sumPositiveNumbers', () => {
  test('суммирование положительных чисел', () => {
    fc.assert(
      fc.property(fc.array(fc.integer(), fc.float()), (arr) => {
        const expectedResult = arr.filter(n => n > 0).reduce((sum, n) => sum + n, 0);
        expect(sumPositiveNumbers(arr)).toBe(expectedResult);
      })
    );
  });
});

describe('groupByParity', () => {
  test('группирование чисел по чётности', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (arr) => {
        const { even, odd } = groupByParity(arr);
        expect(even.every(n => n % 2 === 0)).toBeTruthy();
        expect(odd.every(n => n % 2 !== 0)).toBeTruthy();
      })
    );
  });
});

describe('findCommonElements', () => {
  test('нахождение общих элементов в двух массивах', () => {
    fc.assert(
      fc.property(fc.array(
        fc.integer(), fc.float(), fc.string()
      ), fc.array(
        fc.integer(), fc.float(), fc.string()
      ), (arr1, arr2) => {
        const result = findCommonElements(arr1, arr2);
        const set2 = new Set(arr2);
        result.forEach(item => expect(set2.has(item)).toBeTruthy());
      })
    );
  });
});
import { random } from '../../src/utils/common.utils';
import { readStreamByBlockSize } from '../../src/utils/loader.utils';

test('should return a number between min and max value', () => {
  const number = random(0, 100);

  expect(number).toBeGreaterThan(0);
  expect(number).toBeLessThan(100);
});

test('should throw an error on invalide field name', async () => {
  const path = 'unknownPath';
  expect.assertions(1);
  await expect(() => readStreamByBlockSize(path, 4, null)).rejects.toThrow(
    /^File not found\. This file was not found or is not readable: .*/g
  );
});

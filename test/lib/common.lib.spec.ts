import { random } from '../../lib/common.lib';

test('should return a number between min and max value', () => {
  const number = random(0, 100);

  expect(number).toBeGreaterThan(0);
  expect(number).toBeLessThan(100);
});

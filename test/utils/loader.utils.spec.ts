import { Connection } from '../../src/model/connection.model';
import { Point } from '../../src/model/point.model';
import {
  createConnectionFromBuffer,
  createPointFromBuffer
} from '../../src/utils/loader.utils';

test('should be a valid buffer', () => {
  let buffer = Buffer.alloc(Connection.INSTANCE().totalSize() + 1);
  expect(() => createPointFromBuffer(0, buffer)).toThrow(
    /Invalid point\. The given buffer length \d+ do not match with the expected value \d+/g
  );

  buffer = Buffer.alloc(Connection.INSTANCE().totalSize() - 1);
  expect(() => createPointFromBuffer(0, buffer)).toThrow(
    /Invalid point\. The given buffer length \d+ do not match with the expected value \d+/g
  );
});

test('should be a valid Point model', () => {
  const buffer = Buffer.alloc(Point.INSTANCE().totalSize());
  buffer.writeInt32LE(123456789, 0);
  buffer.writeInt32LE(-123456789, Point.INSTANCE().getSizeOfProperty('y'));
  const point = createPointFromBuffer(0, buffer);

  expect(point.data.x).toBe(123456789);
  expect(point.data.y).toBe(-123456789);
});

test('should be a valid Edge model', () => {
  const buffer = Buffer.alloc(Connection.INSTANCE().totalSize());
  buffer.writeInt32LE(0, 0);
  buffer.writeInt32LE(1, Connection.INSTANCE().getSizeOfProperty('toId'));
  const connection = createConnectionFromBuffer(buffer);

  expect(connection.fromId).toBe(0);
  expect(connection.toId).toBe(1);
});

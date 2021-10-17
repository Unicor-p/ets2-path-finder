import { createCoordinateFromBytes, createEdge } from '../../lib/loader.lib';
import { CoordinateFactory } from '../../src/factory/coordinates.factory';
import { EdgeFactory } from '../../src/factory/edge.factory';

test('should be a valid buffer', () => {
  let buffer = Buffer.alloc(CoordinateFactory.BLOCK_SIZE + 1);
  expect(() => createCoordinateFromBytes(0, buffer)).toThrow(
    /Invalid buffer\. The given buffer length \d+ do not match with the expected value \d+/g
  );

  buffer = Buffer.alloc(CoordinateFactory.BLOCK_SIZE - 1);
  expect(() => createCoordinateFromBytes(0, buffer)).toThrow(
    /Invalid buffer\. The given buffer length \d+ do not match with the expected value \d+/g
  );
});

test('should be a valid Coordinate model', () => {
  const buffer = Buffer.alloc(CoordinateFactory.BLOCK_SIZE);
  buffer.writeInt32LE(123456789, 0);
  buffer.writeInt32LE(-123456789, 4);
  const coordinate = createCoordinateFromBytes(0, buffer);

  expect(coordinate.x).toBe(123456789);
  expect(coordinate.y).toBe(-123456789);
});

test('should be a valid Edge model', () => {
  const buffer = Buffer.alloc(EdgeFactory.BLOCK_SIZE);
  buffer.writeInt32LE(0, 0);
  buffer.writeInt32LE(1, 4);
  const edge = createEdge(buffer);

  expect(edge.from).toBe(0);
  expect(edge.to).toBe(1);
});

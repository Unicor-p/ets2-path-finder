/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	loader.lib.ts
 * Date: 	15/10/2021
 * Time: 	21:26
 */
import * as Path from 'path';
import { CoordinateFactory } from '../src/factory/coordinates.factory';
import { Coordinate } from '../src/model/map';
import { readStreamByBlockSize } from './common.lib';

export function loadCoordinates(): Promise<Coordinate[]> {
  const path = Path.resolve('bin', CoordinateFactory.FILE_NAME);
  const coordinates: Coordinate[] = [];

  return readStreamByBlockSize(
    path,
    CoordinateFactory.BLOCK_SIZE,
    (id: number, buffer: Buffer) => {
      coordinates.push(createCoordinateFromBytes(id, buffer));
    }
  ).then(() => coordinates);
}

export function createCoordinateFromBytes(
  id: number,
  buffer: Buffer
): Coordinate {
  if (buffer.length > CoordinateFactory.BLOCK_SIZE)
    throw new Error(
      `Invalid buffer. The given buffer length ${buffer.length} do not match with the expected value ${CoordinateFactory.BLOCK_SIZE}`
    );

  const x = buffer.readInt32LE();
  const y = buffer.readInt32LE(4);

  return new Coordinate(id, x, y);
}

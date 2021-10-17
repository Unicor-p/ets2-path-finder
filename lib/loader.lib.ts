/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	loader.lib.ts
 * Date: 	15/10/2021
 * Time: 	21:26
 */
import * as Path from 'path';
import { CoordinateFactory } from '../src/factory/coordinates.factory';
import { EdgeFactory } from '../src/factory/edge.factory';
import { Coordinate, Edge } from '../src/model/map';
import { readStreamByBlockSize } from './common.lib';

export function loadCoordinates(path?: string): Promise<Coordinate[]> {
  const coordinates: Coordinate[] = [];

  return readStreamByBlockSize(
    path ?? Path.resolve('bin', CoordinateFactory.FILE_NAME),
    CoordinateFactory.BLOCK_SIZE,
    (id: number, buffer: Buffer) => {
      coordinates.push(createCoordinateFromBytes(id, buffer));
    }
  ).then(() => coordinates);
}

export function loadEdges(path?: string): Promise<Edge[]> {
  const edges: Edge[] = [];

  return readStreamByBlockSize(
    path ?? Path.resolve('bin', EdgeFactory.FILE_NAME),
    EdgeFactory.BLOCK_SIZE,
    (id: number, buffer: Buffer) => {
      edges.push(createEdge(buffer));
    }
  ).then(() => edges);
}

export function createCoordinateFromBytes(
  id: number,
  buffer: Buffer
): Coordinate {
  if (buffer.length !== CoordinateFactory.BLOCK_SIZE)
    throw new Error(
      `Invalid buffer. The given buffer length ${buffer.length} do not match with the expected value ${CoordinateFactory.BLOCK_SIZE}`
    );

  const x = buffer.readInt32LE();
  const y = buffer.readInt32LE(4);

  return new Coordinate(id, x, y);
}

export function createEdge(buffer: Buffer): Edge {
  if (buffer.length !== EdgeFactory.BLOCK_SIZE)
    throw new Error(
      `Invalid edge. The given buffer length ${buffer.length} do not match with the expected value ${EdgeFactory.BLOCK_SIZE}`
    );

  const from = buffer.readInt32LE();
  const to = buffer.readInt32LE(4);

  return new Edge(from, to);
}

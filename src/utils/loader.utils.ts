/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	loader.lib.ts
 * Date: 	15/10/2021
 * Time: 	21:26
 */
import fs from 'fs';
import * as Path from 'path';
import { ConnectionFaker } from '../faker/connection.faker';
import { PointFaker } from '../faker/point.faker';
import { Connection } from '../model/connection.model';
import { Point } from '../model/point.model';

export function loadPoints(path?: string): Promise<Point[]> {
  const coordinates: Point[] = [];

  return readStreamByBlockSize(
    path ?? Path.resolve('bin', PointFaker.FILE_NAME),
    Point.INSTANCE().totalSize(),
    (id: number, buffer: Buffer) => {
      coordinates.push(createPointFromBuffer(id, buffer));
    }
  ).then(() => coordinates);
}

export function loadConnections(path?: string): Promise<Connection[]> {
  const edges: Connection[] = [];

  return readStreamByBlockSize(
    path ?? Path.resolve('bin', ConnectionFaker.FILE_NAME),
    Connection.INSTANCE().totalSize(),
    (id: number, buffer: Buffer) => {
      edges.push(createConnectionFromBuffer(buffer));
    }
  ).then(() => edges);
}

export function createPointFromBuffer(id: number, buffer: Buffer): Point {
  if (buffer.length !== Point.INSTANCE().totalSize())
    throw new Error(
      `Invalid point. The given buffer length ${
        buffer.length
      } do not match with the expected value ${Point.INSTANCE().totalSize()}`
    );

  const x = buffer.readInt32LE();
  const y = buffer.readInt32LE(Point.INSTANCE().getSizeOfProperty('y'));

  return new Point(id, { x, y });
}

export function createConnectionFromBuffer(buffer: Buffer): Connection {
  if (buffer.length !== Connection.INSTANCE().totalSize())
    throw new Error(
      `Invalid edge. The given buffer length ${
        buffer.length
      } do not match with the expected value ${Connection.INSTANCE().totalSize()}`
    );

  const from = buffer.readInt32LE();
  const to = buffer.readInt32LE(
    Connection.INSTANCE().getSizeOfProperty('toId')
  );

  return new Connection(from, to);
}

export function readStreamByBlockSize(
  filename: string,
  blockSize: number,
  callback: CallableFunction | null
): Promise<null> {
  return new Promise(function (resolve, reject) {
    fs.exists(filename, (exist) => {
      if (!exist)
        reject(
          new Error(
            'File not found. This file was not found or is not readable: ' +
              filename
          )
        );

      const stream = fs.createReadStream(filename, {
        highWaterMark: blockSize
      });
      let i = 0;

      stream
        .on('data', (buffer: Buffer) => {
          // console.log(buffer.length);
          // console.log(buffer.readInt32LE());
          // console.log(buffer.readInt32LE(4));
          // console.log('---');
          if (callback !== null) callback(i++, buffer);
        })
        .on('end', () => {
          resolve(null);
        })
        .on('error', reject);
    });
  });
}

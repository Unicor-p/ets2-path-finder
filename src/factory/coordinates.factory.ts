/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	coordinates.factory.ts
 * Date: 	15/10/2021
 * Time: 	20:50
 */
import * as fs from 'fs';
import * as Path from 'path';
import { random } from '../../lib/common.lib';
import { Coordinate } from '../model/map';
import { Factory } from './factory';

export class CoordinateFactory implements Factory {
  static readonly FILE_NAME: string = 'coordinates.co.bin';
  static readonly BLOCK_SIZE: number = 4 * 2; // Int32 * 2. One for X and another for Y

  generate(): Coordinate[] {
    const coordinates: Coordinate[] = [];
    for (let i = 0; i < 5; i++) {
      coordinates.push(
        new Coordinate(i, random(0, 2 ** 31), random(0, 2 ** 31))
      );
    }

    console.log(coordinates);

    return coordinates;
  }

  save(): void {
    const coordinates: Coordinate[] = this.generate();
    const buffer = Buffer.alloc(
      coordinates.length * CoordinateFactory.BLOCK_SIZE
    );
    let idx = 0;
    coordinates.forEach((coordinate) => {
      buffer.writeInt32LE(coordinate.x, idx);
      idx += 4;
      buffer.writeInt32LE(coordinate.y, idx);
      idx += 4;
    });

    fs.writeFileSync(Path.resolve('bin', this.fileName()), buffer);
  }

  fileName(): string {
    return CoordinateFactory.FILE_NAME;
  }
}

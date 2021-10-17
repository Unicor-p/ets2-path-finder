/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	coordinates.faker.ts
 * Date: 	15/10/2021
 * Time: 	20:50
 */
import * as fs from 'fs';
import * as Path from 'path';
import { Point } from '../model/point.model';
import { random } from '../utils/common.utils';
import { Faker } from './faker';

export class PointFaker implements Faker {
  static readonly FILE_NAME: string = 'points.po.bin';

  generate(): Point[] {
    const points: Point[] = [];
    for (let i = 0; i < 6; i++) {
      points.push(
        new Point(i, {
          x: random(0, 2 ** 31),
          y: random(0, 2 ** 31)
        })
      );
    }

    return points;
  }

  save(): void {
    const points: Point[] = this.generate();
    const buffer = Buffer.alloc(points.length * Point.INSTANCE().totalSize());
    let idx = 0;
    points.forEach((point) => {
      buffer.writeInt32LE(point.data.x, idx);
      idx += Point.INSTANCE().getSizeOfProperty('x');
      buffer.writeInt32LE(point.data.y, idx);
      idx += Point.INSTANCE().getSizeOfProperty('y');
    });

    fs.writeFileSync(Path.resolve('bin', PointFaker.FILE_NAME), buffer);
  }
}

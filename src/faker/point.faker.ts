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
import { Faker } from './faker';

export class PointFaker implements Faker {
  static readonly FILE_NAME: string = 'points.po.bin';

  generate(): Point[] {
    const points: Point[] = [];
    points.push(new Point(0, { x: 0, y: 0 }));
    points.push(new Point(1, { x: 1, y: 1 }));
    points.push(new Point(2, { x: -1, y: -1 }));
    points.push(new Point(3, { x: -2, y: -2 }));
    points.push(new Point(4, { x: 0, y: -1 }));

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

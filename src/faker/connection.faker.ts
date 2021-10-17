/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	edge.faker.ts
 * Date: 	17/10/2021
 * Time: 	11:00
 */
import * as fs from 'fs';
import * as Path from 'path';
import { Connection } from '../model/map.model';
import { Faker } from './faker';

export class ConnectionFaker implements Faker {
  static readonly FILE_NAME: string = 'connection.co.bin';

  generate(): Connection[] {
    const edges: Connection[] = [];
    edges.push(new Connection(0, 1));
    edges.push(new Connection(0, 3));
    edges.push(new Connection(2, 3));
    edges.push(new Connection(2, 4));
    edges.push(new Connection(3, 2));
    edges.push(new Connection(3, 4));
    edges.push(new Connection(4, 5));

    return edges;
  }

  save(): void {
    const connections: Connection[] = this.generate();
    const buffer = Buffer.alloc(
      connections.length * Connection.INSTANCE().totalSize()
    );
    let idx = 0;
    connections.forEach((connection) => {
      buffer.writeInt32LE(Number(connection.fromId), idx);
      idx += Connection.INSTANCE().getSizeOfProperty('fromId');
      buffer.writeInt32LE(Number(connection.toId), idx);
      idx += Connection.INSTANCE().getSizeOfProperty('toId');
    });

    fs.writeFileSync(Path.resolve('bin', ConnectionFaker.FILE_NAME), buffer);
  }
}

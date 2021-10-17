/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	edge.factory.ts
 * Date: 	17/10/2021
 * Time: 	11:00
 */
import * as fs from 'fs';
import * as Path from 'path';
import { Edge } from '../model/map';
import { Factory } from './factory';

export class EdgeFactory implements Factory {
  static readonly FILE_NAME: string = 'edges.ed.bin';
  static readonly BLOCK_SIZE: number = 4 * 2; // Int16 * 2. One for X and another for Y

  generate(): Edge[] {
    const edges: Edge[] = [];
    edges.push(new Edge(0, 1));
    edges.push(new Edge(0, 3));
    edges.push(new Edge(2, 3));
    edges.push(new Edge(2, 4));
    edges.push(new Edge(3, 2));
    edges.push(new Edge(3, 4));
    edges.push(new Edge(4, 5));

    console.log(edges);

    return edges;
  }

  save(): void {
    const edges: Edge[] = this.generate();
    const buffer = Buffer.alloc(edges.length * EdgeFactory.BLOCK_SIZE);
    let idx = 0;
    edges.forEach((edge) => {
      buffer.writeInt32LE(edge.from, idx);
      idx += 4;
      buffer.writeInt32LE(edge.to, idx);
      idx += 4;
    });

    fs.writeFileSync(Path.resolve('bin', this.fileName()), buffer);
  }

  fileName(): string {
    return EdgeFactory.FILE_NAME;
  }
}

/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	graph.ts
 * Date: 	15/10/2021
 * Time: 	21:24
 */
import { Coordinate } from './model/map';

export class Graph {
  private _coordinates: Coordinate[] = [];

  get coordinates(): Coordinate[] {
    return this._coordinates;
  }

  set coordinates(value: Coordinate[]) {
    this._coordinates = value;
  }
}

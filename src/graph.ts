/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	graph.ts
 * Date: 	15/10/2021
 * Time: 	21:24
 */
import { Coordinate, Edge } from './model/map';

export class Graph {
  private _coordinates: Coordinate[] = [];
  private _edges: Edge[] = [];

  get coordinates(): Coordinate[] {
    return this._coordinates;
  }

  set coordinates(value: Coordinate[]) {
    this._coordinates = value;
  }

  get edges(): Edge[] {
    return this._edges;
  }

  set edges(value: Edge[]) {
    this._edges = value;
  }
}

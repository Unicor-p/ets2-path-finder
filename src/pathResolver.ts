/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	pathResolver.ts
 * Date: 	15/10/2021
 * Time: 	21:24
 */
import createGraph, { Graph } from 'ngraph.graph';
import { aStar, PathFinder } from 'ngraph.path';
import { Coordinate, Edge } from './model/map';

export class PathResolver {
  private _coordinates: Coordinate[] = [];
  private _edges: Edge[] = [];
  private _graph: Graph;
  private _finder: PathFinder<unknown>;

  constructor() {
    this._graph = createGraph();
    this._finder = aStar(this._graph);
  }

  get coordinates(): Coordinate[] {
    return this._coordinates;
  }

  set coordinates(coordinates: Coordinate[]) {
    this._coordinates = coordinates;
    coordinates.map((coordinate: Coordinate) => {
      this._graph.addNode(coordinate.id, { x: coordinate.x, y: coordinate.y });
    });
  }

  get edges(): Edge[] {
    return this._edges;
  }

  set edges(edges: Edge[]) {
    this._edges = edges;
    edges.map((edge: Edge) => {
      this._graph.addLink(edge.from, edge.to);
    });
  }

  resovle(from: number, to: number) {
    return this._finder.find(from, to);
  }
}

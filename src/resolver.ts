/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	pathResolver.ts
 * Date: 	15/10/2021
 * Time: 	21:24
 */
import createGraph, { Graph, Node } from 'ngraph.graph';
import { aStar, PathFinder } from 'ngraph.path';
import { Connection } from './model/connection.model';
import { Point } from './model/point.model';
import { loadConnections, loadPoints } from './utils/loader.utils';

export class Resolver {
  private _graph: Graph;
  private _finder: PathFinder<unknown>;

  constructor() {
    this._graph = createGraph();
    this._finder = aStar(this._graph);
  }

  init(pointPath?: string, connectionPath?: string): Promise<this> {
    return loadPoints(pointPath)
      .then((points) => {
        this.setPoints(points);
      })
      .then(() => loadConnections(connectionPath))
      .then((links) => {
        this.setLinks(links);

        return this;
      });
  }

  setPoints(points: Point[]) {
    points.map((node: Point) => {
      this._graph.addNode(node.id, node.data);
    });
  }

  setLinks(links: Connection[]) {
    links.map((link: Connection) => {
      this._graph.addLink(link.fromId, link.toId);
    });
  }

  resolve(from: number, to: number) {
    return this._finder.find(from, to);
  }
}

export function redablePath(nodes: Node[]) {
  let path = '';
  nodes.reverse().map((node) => {
    path += node.id + ' -> ';
  });

  return path;
}

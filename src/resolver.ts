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
    this._finder = aStar(this._graph, {
      oriented: true,
      distance: resolverDistance,
      heuristic: resolverHeuristic
    });
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

export function resolverDistance(fromNode: Node, toNode: Node): number {
  const dx = fromNode.data.x - toNode.data.x;
  const dy = fromNode.data.y - toNode.data.y;

  return Math.sqrt(dx * dx + dy * dy);
}

export function resolverHeuristic(fromNode: Node, toNode: Node): number {
  return resolverDistance(fromNode, toNode);
}

export function readablePath(nodes: Node[]) {
  let path = '';
  nodes.reverse().map((node) => {
    path += node.id + ' -> ';
  });

  return path;
}

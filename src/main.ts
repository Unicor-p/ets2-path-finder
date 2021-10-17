import { loadCoordinates, loadEdges } from '../lib/loader.lib';
import { CoordinateFactory } from './factory/coordinates.factory';
import { EdgeFactory } from './factory/edge.factory';
import { Graph } from './graph';

export function main() {
  const coordinateFactory = new CoordinateFactory();
  coordinateFactory.save();

  const edgeFactory = new EdgeFactory();
  edgeFactory.save();

  const graph = new Graph();

  loadCoordinates()
    .then((coordinates) => {
      graph.coordinates = coordinates;
    })
    .then(() => loadEdges())
    .then((edges) => {
      graph.edges = edges;
    })
    .then(() => {
      console.log(graph.coordinates);
      console.log(graph.edges);
    })
    .catch((e) => {
      console.error('[ERROR] ' + e.message);
    });
}

main();

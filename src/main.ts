import { loadCoordinates } from '../lib/loader.lib';
import { CoordinateFactory } from './factory/coordinates.factory';
import { Graph } from './graph';

export function main() {
  const coordinate = new CoordinateFactory();
  coordinate.save();

  const graph = new Graph();

  loadCoordinates().then((coordinates) => {
    graph.coordinates = coordinates;
    console.log(graph.coordinates);
  });
}

main();

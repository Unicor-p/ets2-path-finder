import { loadCoordinates, loadEdges } from '../lib/loader.lib';
import { CoordinateFactory } from './factory/coordinates.factory';
import { EdgeFactory } from './factory/edge.factory';
import { PathResolver } from './pathResolver';

export function main() {
  const coordinateFactory = new CoordinateFactory();
  coordinateFactory.save();

  const edgeFactory = new EdgeFactory();
  edgeFactory.save();

  const pathResolver = new PathResolver();

  loadCoordinates()
    .then((coordinates) => {
      pathResolver.coordinates = coordinates;
    })
    .then(() => loadEdges())
    .then((edges) => {
      pathResolver.edges = edges;
    })
    .then(() => {
      console.log(pathResolver.coordinates);
      console.log(pathResolver.edges);
      console.log(pathResolver.resovle(0, 5));
    })
    .catch((e) => {
      console.error('[ERROR] ' + e.message);
    });
}

main();

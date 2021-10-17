import { ConnectionFaker } from './faker/connection.faker';
import { PointFaker } from './faker/point.faker';
import { redablePath, Resolver } from './resolver';

export function main() {
  const coordinateFactory = new PointFaker();
  coordinateFactory.save();

  const edgeFactory = new ConnectionFaker();
  edgeFactory.save();

  const pathResolver = new Resolver();

  pathResolver
    .init()
    .then(() => {
      const points = pathResolver.resolve(0, 5);
      console.log(redablePath(points));
    })
    .catch((e) => {
      console.error('[ERROR] ' + e.message);
    });
}

main();

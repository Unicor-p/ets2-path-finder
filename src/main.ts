import { ConnectionFaker } from './faker/connection.faker';
import { PointFaker } from './faker/point.faker';
import { readablePath, Resolver } from './resolver';

export function main() {
  new PointFaker().save();
  new ConnectionFaker().save();

  const resolver = new Resolver();

  resolver
    .init()
    .then(() => {
      const points = resolver.resolve(0, 5);
      console.log(readablePath(points));
    })
    .catch((e) => {
      console.error('[ERROR] ' + e.message);
    });
}

main();

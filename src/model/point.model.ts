/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	point.model.ts
 * Date: 	17/10/2021
 * Time: 	17:08
 */

import { Link, Node, NodeId } from 'ngraph.graph';
import { Binary } from './binary.model';

export class Point extends Binary implements Node {
  data: { x: number; y: number } = { x: 0, y: 0 };
  links: Link[] = [];
  id: NodeId = 0;

  constructor(id?: NodeId, data?: { x: number; y: number }) {
    super();
    if (id) this.id = id;
    if (data) this.data = data;
  }

  propertySize(): { name: string; size: number }[] {
    return [
      { name: 'x', size: 4 },
      { name: 'y', size: 4 }
    ];
  }

  static readonly INSTANCE = (): Point => {
    return new Point();
  };
}

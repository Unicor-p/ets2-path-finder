/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	connection.model.ts
 * Date: 	17/10/2021
 * Time: 	17:07
 */

import { Link, LinkId, NodeId } from 'ngraph.graph';
import { Binary } from './binary.model';

export class Connection extends Binary implements Link {
  data = null;
  fromId: NodeId = 0;
  id: LinkId = '';
  toId: NodeId = 0;

  constructor(fromId?: NodeId, toId?: NodeId) {
    super();
    this.id = '';
    if (fromId) this.fromId = fromId;
    if (toId) this.toId = toId;
  }

  static readonly INSTANCE = (): Connection => {
    return new Connection();
  };

  propertySize(): { name: string; size: number }[] {
    return [
      { name: 'fromId', size: 4 },
      { name: 'toId', size: 4 }
    ];
  }
}

/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	Point.ts
 * Date: 	15/10/2021
 * Time: 	20:20
 */
import { Link, LinkId, Node, NodeId } from 'ngraph.graph';

export interface BinaryData {
  totalSize(): number;
  propertySize(): { name: string; size: number }[];
  getSizeOfProperty(name: string): number;
}

export abstract class Binary implements BinaryData {
  abstract propertySize(): { name: string; size: number }[];

  getSizeOfProperty(name: string): number {
    const property = this.propertySize().filter(
      (property) => property.name === name
    );

    if (property.length === 0)
      throw new Error(
        `The property ${name} was not found. Please verify the model declaration`
      );

    if (property.length > 1)
      throw new Error(
        `Too much declaration for the property ${name}. Please verify the model declaration`
      );

    return property[0].size;
  }

  totalSize(): number {
    let total = 0;
    this.propertySize().map((property) => {
      total += property.size;
    });

    return total;
  }
}

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

/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	Point.ts
 * Date: 	15/10/2021
 * Time: 	20:20
 */

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

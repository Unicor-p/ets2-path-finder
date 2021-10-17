/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	faker.ts
 * Date: 	15/10/2021
 * Time: 	20:17
 */

export interface Faker {
  generate(): unknown[];
  save(): void;
}

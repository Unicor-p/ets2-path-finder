/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	factory.ts
 * Date: 	15/10/2021
 * Time: 	20:17
 */

export interface Factory {
	fileName(): string;
	generate(): unknown[];
	save(): void;
}
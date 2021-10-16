/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	Graph.ts
 * Date: 	15/10/2021
 * Time: 	21:24
 */
import { loadCoordinates } from '../lib/loader';
import { Coordinate }      from './model/map';

export class Graph {
	coordinates: Coordinate[] = [];
	
	constructor() {
		loadCoordinates()
			.then( coordinates => this.coordinates = coordinates );
	}
}
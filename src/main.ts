import { loadCoordinates }   from '../lib/loader';
import { CoordinateFactory } from './factory/coordinates';
import { Graph }             from './Graph';

export function hello(): string {
	return 'Hello world!';
}

export function main(){
	const coordinate = new CoordinateFactory();
	coordinate.save();
	
	const graph = new Graph();
	
	loadCoordinates()
		.then( (coordinates) => {
			graph.coordinates = coordinates;
			console.log( graph.coordinates );
		} )
}

main();
import { CoordinateFactory } from './factory/coordinates';
import { Graph }             from './Graph';

export function hello(): string {
	return 'Hello world!';
}

export function main(){
	const coordinate = new CoordinateFactory();
	coordinate.save();
	
	const graph = new Graph();
	console.log( graph.coordinates );
}

main();
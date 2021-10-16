/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	Coordinate.ts
 * Date: 	15/10/2021
 * Time: 	20:20
 */

export class Coordinate {
	public id: number;
	public x: number;
	public y: number;
	
	constructor( id: number, x: number, y: number ) {
		this.id = id;
		this.x  = x;
		this.y  = y;
	}
}

export class Edge {
	public from: number;
	public to: number;
	
	constructor( from: number, to: number ) {
		this.from = from;
		this.to   = to;
	}
}
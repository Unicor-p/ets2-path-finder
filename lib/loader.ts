/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	loader.ts
 * Date: 	15/10/2021
 * Time: 	21:26
 */
import * as Path              from 'path';
import { CoordinateFactory }  from '../src/factory/coordinates';
import { Coordinate }         from '../src/model/map';
import { forEachLine, parse } from './common';

export const loadCoordinates = (): Promise<any> => {
	const path = Path.resolve( 'bin', CoordinateFactory.fileName );
	
	console.log( path );
	
	let coordinates: Coordinate[] = [];
	return forEachLine( path, function ( line: string ) {
		console.log( 'Yellow', line );
		// if ( line[ 0 ] !== 'v' ) return;
		
		let parts = line.split( ' ' );
		let id    = parse( parts[ 1 ] );
		let x     = parse( parts[ 2 ] );
		let y     = parse( parts[ 3 ] );
		
		console.log( 'Yellow >>', id, x, y );
		coordinates.push( new Coordinate( id, x, y ) );
	} )
		.catch( err => {
			console.error( err )
		} )
		.finally( () => {
			console.log( 'Toto', coordinates );
			return coordinates;
		} )
};
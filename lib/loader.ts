/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	loader.ts
 * Date: 	15/10/2021
 * Time: 	21:26
 */
import * as Path             from 'path';
import { CoordinateFactory } from '../src/factory/coordinates';
import { Coordinate }            from '../src/model/map';
import { readStreamByBlockSize } from './common';

export const loadCoordinates = (): Promise<Coordinate[]> => {
	const path = Path.resolve( 'bin', CoordinateFactory.FILE_NAME );
	const coordinates: Coordinate[] = [];
	
	return readStreamByBlockSize( path, CoordinateFactory.BLOCK_SIZE, ( id: number, buffer: Buffer ) => {
		const x = buffer.readInt32LE();
		const y = buffer.readInt32LE(4);
		
		coordinates.push( new Coordinate( id, x, y ) );
	} )
		.then( () => coordinates )
};
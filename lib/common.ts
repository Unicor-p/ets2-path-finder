/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	common.ts
 * Date: 	15/10/2021
 * Time: 	20:30
 */
import * as fs from 'fs';

export const random = ( min: number, max: number ) => {
	min = Math.ceil( min );
	max = Math.floor( max );
	return Math.floor( Math.random() * ( max - min ) ) + min;
};

export const readStreamByBlockSize = ( inputFileName: string, blockSize: number, callback: CallableFunction ) => {
	const stream = fs.createReadStream( inputFileName, {
		highWaterMark: blockSize
	} );
	let i = 0;
	
	return new Promise( function ( resolve, reject ) {
		stream.on( 'data', ( buffer: Buffer ) => {
			// console.log( buffer.readInt32LE() );
			// console.log( buffer.readInt32LE( 4 ) );
			// console.log( '---' );
			callback( i++,  buffer );
		} ).on( 'end', () => {
			resolve( null )
		} ).on( 'error', reject );
	} );
	
};
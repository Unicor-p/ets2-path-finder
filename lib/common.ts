/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	common.ts
 * Date: 	15/10/2021
 * Time: 	20:30
 */
import * as fs       from 'fs';
import * as readline from 'readline';

export function random( min: number, max: number ) {
	min = Math.ceil( min );
	max = Math.floor( max );
	return Math.floor( Math.random() * ( max - min ) ) + min;
}

export function parse(segment: string): number {
	let num = Number.parseInt(segment, 10);
	if (Number.isNaN(num)) throw new Error('Not a number: ' + segment);
	
	return num;
}

export function forEachLine(inputFileName: string, callback: any) {
	const stream = fs.createReadStream( inputFileName );

	return new Promise(function(resolve,reject){
		stream.on('data', (buffer: Buffer) => {
			// console.log( row );
			console.log( buffer.length );
			console.log( buffer.length / 2 / 4 );
			// let sections = [];
			// for( let i = 0; i < buffer.length / 4; i++ ){
			// 	sections.push(buffer.readInt32LE( i * 4 ));
			// }

			// callback(sections)
			// fetchData.push(row);
		}).on('end', () => {
			      console.log('CSV file successfully processed');
			      resolve('fetchData');
		      })
		      .on('error', reject);

	});
	
}
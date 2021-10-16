/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-path-finder
 * file: 	common.lib.ts
 * Date: 	15/10/2021
 * Time: 	20:30
 */
import * as fs from 'fs';

export function random(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function readStreamByBlockSize(
  filename: string,
  blockSize: number,
  callback: CallableFunction
): Promise<null> {
  const stream = fs.createReadStream(filename, {
    highWaterMark: blockSize
  });
  let i = 0;

  return new Promise(function (resolve, reject) {
    stream
      .on('data', (buffer: Buffer) => {
        // console.log( buffer.readInt32LE() );
        // console.log( buffer.readInt32LE( 4 ) );
        // console.log( '---' );
        callback(i++, buffer);
      })
      .on('end', () => {
        resolve(null);
      })
      .on('error', reject);
  });
}

import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { Game } from "./game/game.ts";
import { mockDataNoun, mockDataOtherWords, mockDataPrepositions } from './data/mockData.ts';
// const dataReader = (await import(process.env.MODE === "ts-node" ? './dataReader.ts' : './dataReader')).dataReader as (fileName: string) => Promise<any>

new Game({
  lineReader: createInterface({ input: stdin, output: stdout }),
  fullData: [ 
    ...mockDataNoun, 
    ...mockDataOtherWords,
    ...mockDataPrepositions 
  ],
}).startUp()
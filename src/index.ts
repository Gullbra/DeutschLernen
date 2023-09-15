import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { Game } from "./game/game.ts";;
import { DataHandler } from './data/dataHandler.ts';

new Game({
  lineReader: createInterface({ input: stdin, output: stdout }),
  fullData: await new DataHandler().getData(),
}).startUp()

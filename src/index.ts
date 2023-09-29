import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { Game } from "./game/game.ts";
import { DataHandler } from './data/dataHandler.ts';
import { mockDataNouns, mockDataOtherWords } from './data/mockData.ts';

new Game(
  {
    lineReader: createInterface({ input: stdin, output: stdout }),
    dataHandler: new DataHandler()
  }, 
  [
    'noun', 
    //'preposition',
    //'adverb',
    // 'adjective'
  ]
).startUp()

// * For testing dataHandler:
// const testHandler = new DataHandler()
// await testHandler.saveData(
//   testHandler.applyInclusiveFilters(['adverb'], mockDataOtherWords)
// )

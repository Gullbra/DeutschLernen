import { Game } from "./game/game.ts";
import { DataHandler } from './data/dataHandler.ts';
import { mockDataNouns, mockDataOtherWords } from './data/mockData.ts';


new Game(
  [
    //'noun', 
    'adverb',
    //'preposition',
    // 'adjective'
  ]
).startUp()

// new DataHandler().insertNewData(mockDataNouns)

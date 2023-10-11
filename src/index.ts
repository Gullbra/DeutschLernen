import { Game } from "./game/game.ts";
import { DataHandler } from './data/dataHandler.ts';
import { dataToBeAdded } from './data/mockData.ts';


(!!process.env.ADD_DATA && process.env.ADD_DATA === 'add_data')
  ? new DataHandler().insertNewData(dataToBeAdded)
  : new Game([
      'noun', 
      'adverb',
      //'preposition',
      // 'adjective'
    ]).startUp()

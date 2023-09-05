//import { IJsonData, IGameState } from "./interfaces.ts"
import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { Game } from "./game/game.ts";
import { IWord, TDataArray, INewGameState } from "./util/interfaces.ts";
const dataReader = (await import(process.env.MODE === "ts-node" ? './dataReader.ts' : './dataReader')).dataReader as (fileName: string) => Promise<any>

// const gameState: IGameState = {
//   rl: readline.createInterface({ input: stdin, output: stdout }),
//   wordData: await dataReader('data.json'),
//   workingData: {} as IJsonData,
//   workingKeys: [] as string[],
//   questionsToAnswer: 0,
//   workingQuestionNumber: 0,
//   correctedAnswers: [] as {
//     wordOrPhrase: string,
//     correctlyAnswered: boolean
//   }[],
// }





const gameState: INewGameState = {
  rl: readline.createInterface({ input: stdin, output: stdout }),
  fullData: (await dataReader('data.nouns.json')) as TDataArray,
  currentData: [],
  questionsToAnswer: 0,
  currentQuestionNumber: 0,
  correctedAnswers: [] as {
    dataObject: IWord,
    correctlyAnswered: boolean
  }[],
}

new Game(gameState).startUp()
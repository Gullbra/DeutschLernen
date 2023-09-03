import { IJsonData, IGameState } from "./interfaces.ts"
import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { Game } from "./game.ts";
const dataReader = (await import(process.env.MODE === "ts-node" ? './dataReader.ts' : './dataReader')).dataReader as () => Promise<IJsonData>

const gameState: IGameState = {
  rl: readline.createInterface({ input: stdin, output: stdout }),
  wordData: await dataReader(),
  workingData: {} as IJsonData,
  workingKeys: [] as string[],
  questionsToAnswer: 0,
  workingQuestionNumber: 0,
  correctedAnswers: [] as {
    wordOrPhrase: string,
    correctlyAnswered: boolean
  }[],
}

//new Game(gameState).startUp()

import { AceBase } from 'acebase';

const db = new AceBase('test_db')

//await db.ready(() => console.log('db running?'))

//console.log('after starting?')

// await db.ref('testing_data').set({
//   name: 'testObject',
//   isTest: true
// })

// console.log('after insert?')

console.log(
  (await db.ref('testing_data').get()).val()
)
console.log('after retrieve')

//* https://www.npmjs.com/package/acebase
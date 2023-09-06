import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { Game } from "./game/game.ts";
import { IWord } from "./util/interfaces.ts";
import { mockDataNoun, mockDataOtherWords } from './data/mockData.ts';
// const dataReader = (await import(process.env.MODE === "ts-node" ? './dataReader.ts' : './dataReader')).dataReader as (fileName: string) => Promise<any>

new Game({
  rl: createInterface({ input: stdin, output: stdout }),
  fullData: [ ...mockDataNoun, ...mockDataOtherWords ],
  currentData: [],
  questionsToAnswer: 0,
  currentQuestionNumber: 0,
  correctedAnswers: [] as { dataObject: IWord, correctlyAnswered: boolean }[]
}).startUp()
import { IJsonData, IGameState } from "./interfaces"
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
  correctedAnswers: [] as {[key: string]: boolean}[],
}

new Game(gameState).startUp()
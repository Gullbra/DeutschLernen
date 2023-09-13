import { IClassAdverbAdjective, IGameState } from "../../util/interfaces.ts";
import { inputProcessor, questionInputGenericValidation, qResultMeaningUI } from "../../util/util.ts";

export const questionAdverb = async (gameState: IGameState, word: string, dataObject: IClassAdverbAdjective): Promise<{correct: boolean, error: boolean}> => {
  if (questionInputGenericValidation(word, dataObject)) {
    console.log(`No or invalid dataObject sent to question for word "${word}"`); 
    return { correct: false, error: true }
  }

  let terminalInput = inputProcessor(await gameState.lineReader.question(`What does the ${dataObject.class} "${word}" mean"?\nYour answer: `));
  let correctlyAnswered = dataObject.translation.some(el => el === terminalInput)

  await gameState.lineReader.question(qResultMeaningUI(correctlyAnswered, terminalInput, dataObject.translation))

  return { correct: correctlyAnswered, error: false }
}
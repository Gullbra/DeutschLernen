import { IClassPreposition, IGameState } from "../../util/interfaces.ts";
import { inputProcessor, questionInputGenericValidation, qResultMeaningUI } from "../../util/util.ts";

export const questionPreposition = async (gameState: IGameState, word: string, dataObject: IClassPreposition): Promise<{correct: boolean, error: boolean}> => {
  if (
    questionInputGenericValidation(word, dataObject) ||
    !dataObject.forcesCase || !['akustativ', 'dativ', 'wechsel', 'genetiv'].includes(dataObject.forcesCase) ||
    !dataObject.commonUses || !Array.isArray(dataObject.commonUses) || dataObject.commonUses.length === 0
  ) {
    console.log(`No or invalid dataObject sent to question for word "${word}"`); 
    return { correct: false, error: true }
  }

  let correctlyAnswered: boolean = false 
  let terminalInput: string;

  const meaningQuestion = async () => {
    terminalInput = inputProcessor(
      await gameState
        .lineReader
        .question(`What does the ${dataObject.class} "${word}" mean"?\nYour answer: `)
    );
    correctlyAnswered = dataObject.translation.some(el => el === terminalInput)

    await gameState.lineReader.question(qResultMeaningUI(correctlyAnswered, terminalInput, dataObject.translation))
  }

  await meaningQuestion()

  console.log('preposition: WIP')

  return { correct: correctlyAnswered, error: false }
}
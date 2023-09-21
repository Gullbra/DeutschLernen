import { IClassAdjective, IGameState } from "../../util/interfaces.ts";
import { inputProcessor, questionInputGenericValidation, qResultMeaningUI } from "../../util/util.ts";

export const questionAdjective = async (gameState: IGameState, word: string, dataObject: IClassAdjective): Promise<{correct: boolean, error: boolean}> => {
  if (questionInputGenericValidation(word, dataObject)) {
    console.log(`No or invalid dataObject sent to question for word "${word}"`); 
    return { correct: false, error: true }
  }

  let terminalInput: string, correctlyAnswered: boolean = false;

  const questions: {[keys: string]: () => void} = {
    meaningQuestion: async () => {
      terminalInput = inputProcessor(await gameState.lineReader.question(`What does the ${dataObject.class} "${word}" mean"?\nYour answer: `));
  
      correctlyAnswered = dataObject.translation.some(el => el === terminalInput)
  
      await gameState.lineReader.question(qResultMeaningUI(correctlyAnswered, terminalInput, dataObject.translation))
    },
    declensionQuestion: async () => {

      
      /**
       * nominativ
       * akusativ
       * dativ
       * genitiv
       */
    }
  }




  return { correct: false, error: false }
}



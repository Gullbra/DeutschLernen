import { validationWordClassGeneric, validationWordClassNoun } from "../../util/dataValidations.ts";
import { IClassNoun, IGameState } from "../../util/interfaces.ts";
import { inputProcessor, lineUpTranslations, qResultMeaningUI, qResultSimpleUI } from "../../util/util.ts";

export const questionNoun = async (gameState: IGameState, word: string, dataObject: IClassNoun): Promise<{correct: boolean, error: boolean}> => {
  if (validationWordClassGeneric(word, dataObject) || validationWordClassNoun(dataObject)) {
    console.log(`No or invalid dataObject sent to question for word "${word}"`); 
    return { correct: false, error: true }
  }

  let terminalInput: string, correct: boolean

  const questions = {
    questionArticle: async (): Promise<boolean> => {
      terminalInput = inputProcessor(await gameState.lineReader.question(`Which article corresponds to "${word}", meaning: ${lineUpTranslations(dataObject.translation)}?\nYour answer: `));

      const correctlyAnswered = terminalInput === dataObject.article
  
      await gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, dataObject.article))
      return correctlyAnswered
    },
    questionMeaning: async (): Promise<boolean> => {
      terminalInput = inputProcessor(await gameState.lineReader.question(`What does the ${dataObject.class} "${dataObject.article} ${word}" mean?\nYour answer: `));
      
      if(!(terminalInput.length > 4 && terminalInput.substring(0, 4) === 'the '))
        terminalInput = 'the ' + terminalInput;
  
      const correctlyAnswered = dataObject.translation.some(el => "the " + el === terminalInput)
  
      await gameState.lineReader.question(qResultMeaningUI(correctlyAnswered, terminalInput, dataObject.translation.map(el => 'the ' + el)))
      return correctlyAnswered
    },
    questionPlural: async (): Promise<boolean> => {
      terminalInput = inputProcessor(await gameState.lineReader.question(`What is the plural form of the ${dataObject.class} "${dataObject.article} ${word}", meaning ${lineUpTranslations(dataObject.translation)}?\nYour answer: `));
  
      if(!(terminalInput.length > 4 && terminalInput.substring(0, 4) === 'die '))
        terminalInput = 'die ' + terminalInput;
  
      const correctlyAnswered = 'die ' + dataObject.plural.toLowerCase() === terminalInput    
  
      await gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, 'die ' + dataObject.plural))
      return correctlyAnswered
    },
  }

  if (dataObject.plural !== 'no plural' && Math.round(Math.random()*2) === 0) {
    return { correct: await questions.questionPlural(), error: false }
  }

  return { 
    correct: Math.round(Math.random()) === 0
      ? await questions.questionMeaning()
      : await questions.questionArticle(), 
    error: false
  }
}

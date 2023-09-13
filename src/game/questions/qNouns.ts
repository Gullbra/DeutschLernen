import { IClassNoun, IGameState } from "../../util/interfaces.ts";
import { inputProcessor, questionInputGenericValidation, lineUpTranslations, qResultMeaningUI, qResultSimpleUI } from "../../util/util.ts";

export const questionNoun = async (gameState: IGameState, word: string, dataObject: IClassNoun): Promise<{correct: boolean, error: boolean}> => {
  if (
    questionInputGenericValidation(word, dataObject) || 
    !dataObject.article || typeof dataObject.article !== 'string' || !(dataObject.article === 'der' || dataObject.article === 'das' || dataObject.article === 'die')
  ) {
    console.log(`No or invalid dataObject sent to question for word "${word}"`); 
    return { correct: false, error: true }
  }

  let correctlyAnswered: boolean = false; let terminalInput: string;

  const articleQuestion = async () => {
    terminalInput = inputProcessor(await gameState.lineReader.question(`Which article corresponds to "${word}", meaning: ${lineUpTranslations(dataObject.translation)}?\nYour answer: `));
    correctlyAnswered = terminalInput === dataObject.article

    correctlyAnswered
      ? await gameState.lineReader.question(`Correct!\n`)
      : await gameState.lineReader.question(`Not quite. Correct answer is "${dataObject.article}"\n`)
  }

  const meaningQuestion = async () => {
    terminalInput = inputProcessor(await gameState.lineReader.question(`What does the ${dataObject.class} "${dataObject.article} ${word}" mean?\nYour answer: `));
    
    if(!(terminalInput.length > 4 && terminalInput.substring(0, 4) === 'the '))
      terminalInput = 'the ' + terminalInput;

    correctlyAnswered = dataObject.translation.some(el => "the " + el === terminalInput)

    await gameState.lineReader.question(qResultMeaningUI(correctlyAnswered, terminalInput, dataObject.translation.map(el => 'the ' + el)))
  }

  const pluralQuestion = async () => {
    terminalInput = inputProcessor(await gameState.lineReader.question(`What is the plural form of the ${dataObject.class} "${dataObject.article} ${word}", meaning ${lineUpTranslations(dataObject.translation)}?\nYour answer: `));

    if(!(terminalInput.length > 4 && terminalInput.substring(0, 4) === 'die '))
      terminalInput = 'die ' + terminalInput;

    correctlyAnswered = 'die ' + dataObject.plural.toLowerCase() === terminalInput    

    await gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, 'die ' + dataObject.plural))
  }

  if (dataObject.plural !== 'no plural' && Math.round(Math.random()*2) === 0) {
    await pluralQuestion()
    return { correct: correctlyAnswered, error: false }
  }

  Math.round(Math.random()) === 0
    ? await meaningQuestion()
    : await articleQuestion()

  return { correct: correctlyAnswered, error: false }
}

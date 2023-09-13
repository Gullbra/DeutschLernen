import { IClassAdverbAdjective, IGameState } from "../../util/interfaces.ts";
import { inputProcessor, questionInputGenericValidation, qResultMeaningUI } from "../../util/util.ts";

export const questionAdjective = async (gameState: IGameState, word: string, dataObject: IClassAdverbAdjective): Promise<{correct: boolean, error: boolean}> => {
  if (questionInputGenericValidation(word, dataObject)) {
    console.log(`No or invalid dataObject sent to question for word "${word}"`); 
    return { correct: false, error: true }
  }

  // let terminalInput = inputProcessor(await gameState.lineReader.question(`What does the ${dataObject.class} "${word}" mean"?\nYour answer: `));
  // let correctlyAnswered = dataObject.translation.some(el => el === terminalInput)

  // await gameState.lineReader.question(qResultMeaningUI(correctlyAnswered, terminalInput, dataObject.translation))

  return { correct: false, error: false }
}

/* //* Adjective declining matrix:
  bestämdform (der, das, die)
    nominativ (-e/-e/-e):
      der: der kleine heiße Kaffee
      das: das kleine warme Sandwich
      die: die kleine heiße Schokolade

    akusativ (-en/-e/-e)
      der: (ich mag) den kleinen heißen kaffee
      das: (ich mag) das kleine warme Sandwich
      die: (ich mag) die kleine heiße Schokolade
    
    dativ (-en/-en/-en)
      der: (Ich gebe den Ball) dem kleinen glücklichen Mann
      das: (Ich gebe den Ball) dem kleinen glücklichen Kind
      die: (Ich gebe den Ball) der kleinen glücklichen Frau 
    
    Genetiv (-en/-en/-en)
      der: (das Licht) des großen weißen Mondes
      das: (das Licht) des großen weißen Elements
      die: (das Licht) der großen weißen Sonne

  obestämd
    nominativ (-er/-es/-e)
      der: ein kleiner heißer Kaffee
      das: ein kleines warmes Sandwich
      die: eine kleine heiße Schokolade

    akusativ (-en/-es/-e)
      der: (ich nehme) einen kleinen heißen kaffee
      das: (ich nehme) ein kleines warmes Sandwich
      die: (ich nehme) eine kleine heiße Schokolade

    dativ (-en/-en/-en)
      der: (Ich gebe den Ball) einem kleinen glücklichen Mann
      das: (Ich gebe den Ball) einem kleinen glücklichen Kind
      die: (Ich gebe den Ball) einer kleinen glücklichen Frau 

    Genetiv (-en/-en/-en)
      der: (das Licht) eines großen weißen Mondes
      das: (das Licht) eines großen weißen Elements
      die: (das Licht) einer großen weißen Sonne
*/
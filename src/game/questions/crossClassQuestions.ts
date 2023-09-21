// class QClassAdverb {
//   private gameState: IGameState
//   private word: string
//   private dataObject: IClassAdverb

//   constructor (gameState: IGameState, word: string, dataObject: IClassAdverb) {this.gameState = gameState; this.word = word; this.dataObject = dataObject;}


//   async askQuestion (): Promise<{correct: boolean, error: boolean}> {
//     if (validationWordClassGeneric(this.word, this.dataObject) && validationWordClassAdverb(this.word, this.dataObject)) {
//       console.log(`No or invalid dataObject sent to question for word "${this.word}"`); 
//       return { correct: false, error: true }
//     }    
//     // try {

//     const correct = await (async () => {
//       if(!this.dataObject.absoluteAdverb) {
//         const randomizeExerciseType = Math.round(Math.random() * 3)


//           if (randomizeExerciseType === 3) {
//             return await this.questionMeaning()
//           } else if (randomizeExerciseType === 2) {
//             return await this.questionDegreeOfComparision(this.dataObject.comparative)
//           } else {
//             return await this.questionDegreeOfComparision(this.dataObject.superlative)
//           }

//       } else {
//         return await this.questionMeaning()
//       }
//     }) ()

//   // } catch (err) {
//   //   console.log(`Error at ${this.word}: ` + (err as {message: string}).message)
//   // }
  
//     return { correct, error: false }
//   }

//   async questionMeaning (): Promise<boolean> {
//     const terminalInput = inputProcessor(await this.gameState.lineReader.question(`What does the ${this.dataObject.class} "${this.word}" mean"?\nYour answer: `));

//     const correctlyAnswered = this.dataObject.translation.some(el => el === terminalInput)
  
//     await this.gameState.lineReader.question(qResultMeaningUI(correctlyAnswered, terminalInput, this.dataObject.translation))
//     return correctlyAnswered
//   }


//   async questionDegreeOfComparision (degreeOfComparision: IDegreeOfComparisonObject): Promise<boolean> {
//     if (!validationDegreeOfComparisionObject(degreeOfComparision))
//       throw new Error(`Unvalid degree of comparision dataobject for adjective ${this.word}`)

//     const selectedPhrase = randomizeArrayElement(degreeOfComparision.useInPhrase)
//     const blankedPhrase = selectedPhrase.phrase.replace(degreeOfComparision.word, '_'.repeat(degreeOfComparision.word.length))

//     const terminalInput = inputProcessor(await this.gameState.lineReader.question(
//       `Using the ${this.dataObject.class} "${this.word}", complete the phrase;\n\n\t"${blankedPhrase}",\n\nso that it means: "${selectedPhrase.translation}".\nYour answer: `
//     ))

//     const correctlyAnswered = (terminalInput === degreeOfComparision.word.toLowerCase() || terminalInput === selectedPhrase.phrase.toLowerCase())

//     await this.gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, `"${selectedPhrase.phrase}"`))
//     return correctlyAnswered
//   }
// }
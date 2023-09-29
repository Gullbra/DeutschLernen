import { INounDeclension } from "../../util/interfaces.ts"

export interface IConvertedNoun { article: string, noun: string } []

export class NounCaseConverter {
  constructor (private article: string, public nounNominativ: string, private plural: boolean, private regularDeclension: boolean, private declensionObj?: INounDeclension) {
    console.log("WIP - add akusativ and dativ -n declension. (e.g. Affe => Affen)")
  }
  
  convertToCase(toCase: string): IConvertedNoun {
    switch (toCase.toLowerCase()) {
      case 'akusativ':
        return this.convertToAkusativ()
      case 'dativ':
        return this.convertToDativ()    
      case 'genetiv':
        return this.convertToGenetiv()    
      default:
        throw new Error('NounCaseConverter: Invalid case')
    }
  }

  private convertToAkusativ = (): IConvertedNoun => {
    const returnObj = {
      article: this.article,
      noun: this.nounNominativ,
    }
  
    if (this.plural) {
      returnObj.article = 'die'
    } else if (this.article === 'der') {
      returnObj.article = 'den'
    }
  
    return returnObj
  }

  private convertToDativ = (): IConvertedNoun => {
    const returnObj = {
      article: this.article,
      noun: this.nounNominativ
    }
  
    if (this.plural) {
      // throw new Error ("NounCaseConverter: Dativ plural declension not implemented")
      if (!this.regularDeclension)
        throw new Error ("NounCaseConverter: irregular declension handling not implemented")
      
      if (!['s', 'ß', 'n'].includes(this.nounNominativ[this.nounNominativ.length-1])) {
        returnObj.noun += 'n'
      } 
      
      returnObj.article = 'den'
    }
    else if (['der', 'das'].includes(this.article)) {
      returnObj.article = 'dem'
    }
    else if (this.article === 'die') {
      returnObj.article = 'der'
    }
  
    return returnObj
  }

  private convertToGenetiv = (): IConvertedNoun => {  
    const returnObj = {
      article: this.article,
      noun: this.nounNominativ,
    }
  
    if (this.plural) {
      returnObj.article = 'der'
    } else if (['der', 'das'].includes(this.article)) {
      // throw new Error ("NounCaseConverter: Genetiv plural declension not implemented")
      if (!this.regularDeclension)
        throw new Error ("NounCaseConverter: irregular declension handling not implemented")
      returnObj.article = 'des'
  
      if (['s', 'ß', 'x', 'z'].includes(this.nounNominativ[this.nounNominativ.length-1])) {
        returnObj.noun += 'es'
      } else {
        returnObj.noun += 's'
      }
    } else if (this.article === 'die') {
      returnObj.article = 'der'
    }
  
    return returnObj
  }
}
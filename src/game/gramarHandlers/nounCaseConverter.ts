import { INounDeclension } from "../../util/interfaces.ts"

interface IDefArticleAndNoun { defArticle: string, noun: string }
export interface IConvertedNoun extends IDefArticleAndNoun { indefArticle: string }

export class NounCaseConverter {
  constructor (private article: string, public nounNominativ: string, private plural: boolean, private declensionObj?: INounDeclension) {}
  
  convertToCase(toCase: string): IConvertedNoun {
    switch (toCase.toLowerCase()) {
      case 'akusativ':
        return {...this.convertToAkusativ(), indefArticle: this.setIndefinateArticle('akusativ')}
      case 'dativ':
        return {...this.convertToDativ(), indefArticle: this.setIndefinateArticle('dativ')}  
      case 'genetiv':
        return {...this.convertToGenetiv(), indefArticle: this.setIndefinateArticle('genetiv')}  
      default:
        throw new Error('NounCaseConverter: Invalid case')
    }
  }

  private convertToAkusativ = (): IDefArticleAndNoun => {
    const returnObj = {
      defArticle: this.article,
      noun: this.nounNominativ,
    }
  
    if (this.plural) {
      returnObj.defArticle = 'die'
    } else if (this.article === 'der') {
      returnObj.defArticle = 'den'
    }

    if(this.declensionObj && !this.plural) {
      if(this.declensionObj.nGeneral || this.declensionObj.nsGenitiv)
        returnObj.noun += 'n'
      if(this.declensionObj.enGeneral)
        returnObj.noun += 'en'
    }
  
    return returnObj
  }

  private convertToDativ = (): IDefArticleAndNoun => {
    const returnObj = {
      defArticle: this.article,
      noun: this.nounNominativ
    }

    if(this.declensionObj && !this.plural) {
      if(this.declensionObj.nGeneral || this.declensionObj.nsGenitiv)
        returnObj.noun += 'n'
      if(this.declensionObj.enGeneral)
        returnObj.noun += 'en'
    }
  
    if (this.plural) {      
      if (!['s', 'ß', 'n'].includes(this.nounNominativ[this.nounNominativ.length-1])) {
        returnObj.noun += 'n'
      } 
      
      returnObj.defArticle = 'den'
    }
    else if (['der', 'das'].includes(this.article)) {
      returnObj.defArticle = 'dem'
    }
    else if (this.article === 'die') {
      returnObj.defArticle = 'der'
    }
  
    return returnObj
  }

  private convertToGenetiv = (): IDefArticleAndNoun => {  
    const returnObj = {
      defArticle: this.article,
      noun: this.nounNominativ,
    }
  
    if(this.declensionObj && !this.plural) {
      if(this.declensionObj.nsGenitiv)
        returnObj.noun += 'ns'        
      if(this.declensionObj.sesGenetiv)
        returnObj.noun += 'ses'        
      if(this.declensionObj.nGeneral)
        returnObj.noun += 'n'
      if(this.declensionObj.enGeneral)
        returnObj.noun += 'en'
    } else if (['der', 'das'].includes(this.article)) {
      if (['s', 'ß', 'x', 'z'].includes(this.nounNominativ[this.nounNominativ.length-1])) {
        returnObj.noun += 'es'
      } else {
        returnObj.noun += 's'
      }
    }

    if (this.plural) {
      returnObj.defArticle = 'der'
    } else if (['der', 'das'].includes(this.article)) {
      returnObj.defArticle = 'des'
    } else if (this.article === 'die') {
      returnObj.defArticle = 'der'
    }
  
    return returnObj
  }

  private setIndefinateArticle = (toCase: string): string => {
    switch (toCase) {
      case 'akusativ':
        if (this.plural)
          return 'viele'
        
        switch (this.article) {
          case 'der': return 'einen'
          case 'das': return 'ein'
          case 'die': return 'eine'        
        }
        
      case 'dativ':
        if (this.plural)
          return 'vielen'
        
        switch (this.article) {
          case 'der': return 'einem'
          case 'das': return 'einem'
          case 'die': return 'einer'        
        }

      case 'genetiv':
        if (this.plural)
          return 'vieler'
        
        switch (this.article) {
          case 'der': return 'eines'
          case 'das': return 'eines'
          case 'die': return 'einer'        
        }

      default:
        throw new Error('bad input, somehow, to: NounCaseConverter: setIndefinateArticle')
    }
  }
}
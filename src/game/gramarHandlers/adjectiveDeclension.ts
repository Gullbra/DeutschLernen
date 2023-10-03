
export interface IDeclinedAdective {

}

export class AdjectiveDecliner {
  constructor (private adjective: string) {}

  declineAdjective (nounCase: string, nounArticle: string, nounIsPlural: boolean, articleIsDefinite: boolean): IDeclinedAdective {

    // articleIsDefinite
    switch (nounCase) {
      case 'nominativ': return this.declineNominativ(nounArticle, nounIsPlural, articleIsDefinite)
      case 'akusativ': return this.declineAkusativ(nounArticle, nounIsPlural, articleIsDefinite)
      case 'dativ': return this.declineDativ(nounArticle, nounIsPlural, articleIsDefinite)
      case 'genetiv': return this.declineGenetiv(nounArticle, nounIsPlural, articleIsDefinite)
    
      default:
        throw new Error('invalid case to AdjectiveConverter');
    }
  }
  
  declineNominativ(nounArticle: string, nounIsPlural: boolean, articleIsDefinite: boolean): IDeclinedAdective {
    throw new Error("Method not implemented.");
  }
  declineAkusativ (nounArticle: string, nounIsPlural: boolean, articleIsDefinite: boolean): IDeclinedAdective {
    return {}
  }
  declineDativ (nounArticle: string, nounIsPlural: boolean, articleIsDefinite: boolean): IDeclinedAdective {
    return {}
  }
  declineGenetiv (nounArticle: string, nounIsPlural: boolean, articleIsDefinite: boolean): IDeclinedAdective {
    return {}
  }
}
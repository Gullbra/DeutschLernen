export class AdjectiveDecliner {
  constructor (private adjective: string) {}

  declineAdjective (
    nounCase: string, 
    nounGender: string, 
    nounIsPlural: boolean, 
    nounArticleIsDefinite: boolean
  ): string {
    switch (nounCase) {
      case 'nominativ': return this.handleNominativ(nounGender, nounIsPlural, nounArticleIsDefinite)
      case 'akusativ': return this.handleAkusativ(nounGender, nounIsPlural, nounArticleIsDefinite)
      case 'dativ': return this.handleDativ(nounGender, nounIsPlural, nounArticleIsDefinite)
      case 'genetiv': return this.handleGenetiv(nounGender, nounIsPlural, nounArticleIsDefinite)
      default: throw new Error('invalid case to AdjectiveConverter');
    }
  }
  
  private handleNominativ(nounGender: string, nounIsPlural: boolean, nounArticleIsDefinite: boolean): string {
    if (nounIsPlural)
      return nounArticleIsDefinite ? this.declineWithEn() : this.declineWithE()

    switch (nounGender) {
      case 'masculine': return nounArticleIsDefinite ? this.declineWithE() : this.declineWithEr()
      case 'neuter': return nounArticleIsDefinite ? this.declineWithE() : this.declineWithEs()
      case 'feminine': return this.declineWithE()
      default: throw new Error('invalid gender to AdjectiveConverter');
    }
  }

  private handleAkusativ (nounGender: string, nounIsPlural: boolean, nounArticleIsDefinite: boolean): string {
    if (nounIsPlural)
      return nounArticleIsDefinite ? this.declineWithEn() : this.declineWithE()

    switch (nounGender) {
      case 'masculine': return this.declineWithEn()
      case 'neuter': return nounArticleIsDefinite ? this.declineWithE() : this.declineWithEs()
      case 'feminine': return this.declineWithE()
      default: throw new Error('invalid gender to AdjectiveConverter');
    }
  }

  private handleDativ (nounGender: string, nounIsPlural: boolean, nounArticleIsDefinite: boolean): string {
    return this.declineWithEn()
  }

  private handleGenetiv (nounGender: string, nounIsPlural: boolean, nounArticleIsDefinite: boolean): string {
    if (nounIsPlural)
      return nounArticleIsDefinite ? this.declineWithEn() : this.declineWithEr()
    return this.declineWithEn()
  }


  private declineWithE(): string { return this.adjective + 'e' }
  private declineWithEn(): string { return this.adjective + 'en' }
  private declineWithEr(): string { return this.adjective + 'er' }
  private declineWithEs(): string { return this.adjective + 'es' }
}

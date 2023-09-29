import { NounCaseConverter, IConvertedNoun } from '../game/gramarHandlers/nounCaseConverter.ts';
import { expect } from 'chai';

describe ("NounCaseConverter() tests:", () => {
  describe("Validation testing:", () => {
    const testObject = new NounCaseConverter('der', "Mann", false, true)

    it("should not accept bad cases", () => {
      try {
        expect(() => testObject.convertToCase('aeg')).to.throw()
      } catch (err) {
        expect(true).to.equal(false)
      }
    })

    describe("should, for now, throw error when conversion requires unimplemented declension", () => {
      // it("genetiv, masculine, neuter and plural", () => {
      //   try {
      //     expect(() => testObject.convertToCase('genetiv')).to.throw()
      //   } catch (err) {
      //     expect(true).to.equal(false)
      //   }
      // })
    })
  })

  describe("IO tests:", () => {
    const mockObjectsGeneral = [
      new NounCaseConverter('der', 'Kühlschrank', false, true),
      new NounCaseConverter('das', 'Kopfkissen', false, true),
      new NounCaseConverter('die', 'Bett', false, true),
      new NounCaseConverter('die', 'Bücher', true, true),
    ]

    describe("Should convert correctly to akusativ", () => {
      const expectedArr: IConvertedNoun[] = [
        {defArticle: 'den', indefArticle: 'einen', noun: 'Kühlschrank'},
        {defArticle: 'das', indefArticle: 'ein', noun: 'Kopfkissen'},
        {defArticle: 'die', indefArticle: 'eine', noun: 'Bett'},
        {defArticle: 'die', indefArticle: 'viele', noun: 'Bücher'},
      ]

      mockObjectsGeneral.forEach((mock, index) =>{
        it(`${mock.nounNominativ}`, () => {
          expect(mock.convertToCase('akusativ')).to.eql(expectedArr[index])
        })
      })
    })

    describe("Should convert correctly to dativ", () => {
      describe("Should handle forms without declension", () => {
        const expectedArr: IConvertedNoun[] = [
          {defArticle: 'dem', indefArticle: 'einem', noun: 'Kühlschrank'},
          {defArticle: 'dem', indefArticle: 'einem', noun: 'Kopfkissen'},
          {defArticle: 'der', indefArticle: 'einer', noun: 'Bett'},
        ]
          
        mockObjectsGeneral.slice(0, 3).forEach((mock, index) =>{
          it(`${mock.nounNominativ}`, () => {
            expect(mock.convertToCase('dativ')).to.eql(expectedArr[index])
          })
        })
      })

      // https://www.gymglish.com/en/wunderbla/german-grammar/plural-endings-in-the-dative
      describe("Should handle dativ plural with correct declension", () => {
        const inputArr: NounCaseConverter[] = [
          new NounCaseConverter('die', 'Zahlen', true, true),
          new NounCaseConverter('die', 'Leute', true, true),
          new NounCaseConverter('die', 'Mauern', true, true),
          new NounCaseConverter('die', 'Autos', true, true),
        ]
        const expectedArr: IConvertedNoun[] = [
          {defArticle: 'den', indefArticle: 'vielen', noun: 'Zahlen'},
          {defArticle: 'den', indefArticle: 'vielen', noun: 'Leuten'},
          {defArticle: 'den', indefArticle: 'vielen', noun: 'Mauern'},
          {defArticle: 'den', indefArticle: 'vielen', noun: 'Autos'},
        ]
          
        inputArr.forEach((mock, index) =>{
          it(`${mock.nounNominativ}`, () => {
            expect(mock.convertToCase('dativ')).to.eql(expectedArr[index])
          })
        })
      })
    })
    
    describe("Should convert correctly to genetiv", () => {
      describe("Should correctly convert articles to genetiv", () => {
        const expectedArr: IConvertedNoun[] = [
          {defArticle: 'des', indefArticle: 'eines', noun: ''},
          {defArticle: 'des', indefArticle: 'eines', noun: ''},
          {defArticle: 'der', indefArticle: 'einer', noun: ''},
          {defArticle: 'der', indefArticle: 'vieler', noun: ''},
        ]
          
        mockObjectsGeneral.forEach((mock, index) =>{
          it(`${mock.nounNominativ}`, () => {
            const testObj = mock.convertToCase('genetiv')
            expect(testObj.defArticle).to.eql(expectedArr[index].defArticle)
            expect(testObj.indefArticle).to.eql(expectedArr[index].indefArticle)
          })
        })
      })

      describe("Should correctly handle genetiv declension", () => {
        /* 
          ? docs:
        https://easy-deutsch.com/nouns/german-cases/genitive/#tab-con-2
        https://learngerman.dw.com/en/genitive/l-38263639/gr-38950116
          ? Seems good; adjective declension aswell. Dives deep, WHAY complicated
        https://germanwithlaura.com/genitive-case/
          ? Handling of given Names aswell, and;
          ! "The same nouns that have the letter -(e)n added in accusative and dative"
        https://mydailygerman.com/german-declension-the-four-grammatical-cases-in-detail/
          ? Handles both -n -en and provids (short) list of exceptions:
        https://www.fluentu.com/blog/german/german-genitive/#toc_4
          ? Diffrent explanation, seems to cover much:
        https://www.germanveryeasy.com/noun-declension
        */

        const inputArr: NounCaseConverter[] = [
          new NounCaseConverter('der', 'Opa', false, true),
          new NounCaseConverter('der', 'Platz', false, true),
          new NounCaseConverter('die', 'Tür', false, true),
        ]
        const expectedArr: (string | IConvertedNoun)[][] = [
          ['masculine/neuter declension, adding of (-s)', {defArticle: 'des', indefArticle: 'eines', noun: 'Opas'}],
          ['masculine/neuter declension, ending in "s", "ß", "x" or "z", adding of (-es)', {defArticle: 'des', indefArticle: 'eines', noun: 'Platzes'}],
          //['monosyllabic masculine/neuter declension, adding of (-es or -s)', {defArticle: 'des', indefArticle: , noun: 'Jahres'}],
          // ! Maybe let conversion-function return array to handle Jahres and Jahrs both beeing correct
          ['feminine declension - no declension',  {defArticle: 'der', indefArticle: 'einer', noun: 'Tür'}],
        ]
          
        inputArr.forEach((mock, index) =>{
          it(`${mock.nounNominativ}`, () => {
            expect(mock.convertToCase('genetiv').noun).to.eql(expectedArr[index])
          })
        })
      })
    })
  })
})

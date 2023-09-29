import { NounCaseConverter, IConvertedNoun } from '../game/gramarHandlers/nounCaseConverter.ts';
import { expect } from 'chai';

describe ("NounCaseConverter() tests:", () => {
  const mockObjectsGeneral = [
    new NounCaseConverter('der', 'Kühlschrank', false, true),
    new NounCaseConverter('das', 'Kopfkissen', false, true),
    new NounCaseConverter('die', 'Bett', false, true),
    new NounCaseConverter('die', 'Bücher', true, true),
  ]

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
    describe("Should convert correctly to akusativ", () => {
      const expectedArr: IConvertedNoun[] = [
        {article: 'den', noun: 'Kühlschrank'},
        {article: 'das', noun: 'Kopfkissen'},
        {article: 'die', noun: 'Bett'},
        {article: 'die', noun: 'Bücher'},
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
          {article: 'dem', noun: 'Kühlschrank'},
          {article: 'dem', noun: 'Kopfkissen'},
          {article: 'der', noun: 'Bett'},
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
          {article: 'den', noun: 'Zahlen'},
          {article: 'den', noun: 'Leuten'},
          {article: 'den', noun: 'Mauern'},
          {article: 'den', noun: 'Autos'},
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
          {article: 'des', noun: ''},
          {article: 'des', noun: ''},
          {article: 'der', noun: ''},
          {article: 'der', noun: ''},
        ]
          
        mockObjectsGeneral.forEach((mock, index) =>{
          it(`${mock.nounNominativ}`, () => {
            expect(mock.convertToCase('genetiv').article).to.equal(expectedArr[index].article)
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
        ]
        const expectedArr: (string | IConvertedNoun)[][] = [
          ['masculine declension, adding of (-s)', {article: 'des', noun: 'Opas'}],
          ['monosyllabic feminine declension, adding of (-es or -s)', {article: 'des', noun: 'Jahres'}],
          //['masculine declension, adding of (-es)', {article: 'des', noun: 'Jahres'}],
          // ! Maybe let conversion-function return array to handle Jahres and Jahrs both beeing correct
          ['masculine declension, adding of (-es)', {article: 'des', noun: 'Jahres'}],
          ['feminine declension',  {article: 'der', noun: 'Beziehungen'}],
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

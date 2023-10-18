import { NounCaseConverter, IConvertedNoun } from '../game/gramarHandlers/nounCaseConverter.ts';
import { expect } from 'chai';

describe.only("NounCaseConverter() tests:", () => {
  describe("Validation testing:", () => {
    const testObject = new NounCaseConverter('der', "Mann", false)

    it("should not accept bad cases", () => {
      try {
        expect(() => testObject.convertToCase('aeg')).to.throw()
      } catch (err) {
        expect(true).to.equal(false)
      }
    })
  })

  describe("IO tests:", () => {
    const mockObjectsGeneral = [
      new NounCaseConverter('der', 'Kühlschrank', false),
      new NounCaseConverter('das', 'Kopfkissen', false),
      new NounCaseConverter('die', 'Bett', false),
      new NounCaseConverter('die', 'Bücher', true),
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
          new NounCaseConverter('die', 'Zahlen', true),
          new NounCaseConverter('die', 'Leute', true),
          new NounCaseConverter('die', 'Mauern', true),
          new NounCaseConverter('die', 'Autos', true),
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
          new NounCaseConverter('der', 'Opa', false),
          new NounCaseConverter('der', 'Platz', false),
          new NounCaseConverter('die', 'Tür', false),
        ]
        const expectedArr: (string | IConvertedNoun)[][] = [
          ['masculine/neuter declension, adding of (-s)', {defArticle: 'des', indefArticle: 'eines', noun: 'Opas'}],
          ['masculine/neuter declension, ending in "s", "ß", "x" or "z", adding of (-es)', {defArticle: 'des', indefArticle: 'eines', noun: 'Platzes'}],
          //['monosyllabic masculine/neuter declension, adding of (-es or -s)', {defArticle: 'des', indefArticle: , noun: 'Jahres'}],
          // ! Maybe let conversion-function return array to handle Jahres and Jahrs both beeing correct
          ['feminine declension - no declension',  {defArticle: 'der', indefArticle: 'einer', noun: 'Tür'}],
        ]
          
        inputArr.forEach((mock, index) =>{
          it(`${expectedArr[index][0]}`, () => {
            expect(mock.convertToCase('genetiv')).to.eql(expectedArr[index][1])
          })
        })
      })
    })

    describe("Should handle special declensions", () => {
      describe("-n declension", () => {
        const testCase = new NounCaseConverter('der', 'Kollege', false, {nGeneral: true})
                //const testCase = new NounCaseConverter('der', 'Name', false, true, {})

        const runsArr: (string | IConvertedNoun)[][] = [
          ['akusativ', {defArticle: 'den', indefArticle: 'einen', noun: 'Kollegen'}],
          ['dativ', {defArticle: 'dem', indefArticle: 'einem', noun: 'Kollegen'}],
          ['genetiv', {defArticle: 'des', indefArticle: 'eines', noun: 'Kollegen'}],
        ]

        runsArr.forEach(run => {
          it(`${run[0]}`, () => {
            expect(testCase.convertToCase(run[0] as string)).to.eql(run[1] as IConvertedNoun)
          })
        })
      })

      describe("-ns declension", () => {
        const testCase = new NounCaseConverter('der', 'Name', false, {nsGenitiv: true})

        const runsArr: (string | IConvertedNoun)[][] = [
          ['akusativ', {defArticle: 'den', indefArticle: 'einen', noun: 'Namen'}],
          ['dativ', {defArticle: 'dem', indefArticle: 'einem', noun: 'Namen'}],
          ['genetiv', {defArticle: 'des', indefArticle: 'eines', noun: 'Namens'}],
        ]

        runsArr.forEach(run => {
          it(`${run[0]}`, () => {
            expect(testCase.convertToCase(run[0] as string)).to.eql(run[1] as IConvertedNoun)
          })
        })
      })

      describe("-en declension", () => {
        const testCase = new NounCaseConverter('der', 'Soldat', false, {enGeneral: true})

        const runsArr: (string | IConvertedNoun)[][] = [
          ['akusativ', {defArticle: 'den', indefArticle: 'einen', noun: 'Soldaten'}],
          ['dativ', {defArticle: 'dem', indefArticle: 'einem', noun: 'Soldaten'}],
          ['genetiv', {defArticle: 'des', indefArticle: 'eines', noun: 'Soldaten'}],
        ]

        runsArr.forEach(run => {
          it(`${run[0]}`, () => {
            expect(testCase.convertToCase(run[0] as string)).to.eql(run[1] as IConvertedNoun)
          })
        })
      })

      describe("-sus declension", () => {
        it(`genetiv`, () => {
          expect(
            new NounCaseConverter('der', 'Bus', false, {sesGenetiv: true}).convertToCase('genetiv')
          ).to.eql({defArticle: 'des', indefArticle: 'eines', noun: 'Busses'} as IConvertedNoun)
        })
      })
    })

    describe("Uncovered unhandled cases", () => {
      describe("der Schild", () => {
        const unhandledCase = new NounCaseConverter('der', 'Schild', false)
        const expectedCase: {[key:string]: IConvertedNoun} = {
          genetiv: { defArticle: "des", noun: "Schildes", indefArticle: "eines"}
        }

        it("genetiv", () => expect(unhandledCase.convertToCase("genetiv")).to.eql(expectedCase.genetiv))
      })

      describe("das Böse", () => {
        const unhandledCase = new NounCaseConverter('das', 'Böse', false, { nGeneral: true })
        const expectedCase: {[key:string]: IConvertedNoun} = {
          dativ: { defArticle: "dem", noun: "Bösen", indefArticle: "einem" },
          genetiv: { defArticle: "des", noun: "Bösen", indefArticle: "eines" }
        }
        
        it("dativ", () => expect(unhandledCase.convertToCase("dativ")).to.eql(expectedCase.dativ))
        it("genetiv", () => expect(unhandledCase.convertToCase("genetiv")).to.eql(expectedCase.genetiv))
      })
      
      describe("das Gebiet", () => {
        const unhandledCase = new NounCaseConverter('das', 'Gebiet', false, { esGenetivForced: true })
        const expectedCase: {[key:string]: IConvertedNoun} = {
          genetiv: { defArticle: "des", noun: "Gebietes", indefArticle: "eines"}
        }

        it("genetiv", () => expect(unhandledCase.convertToCase("genetiv")).to.eql(expectedCase.genetiv))
      })

      describe("das Schiff", () => {
        const unhandledCase = new NounCaseConverter('das', 'Schiff', false)
        const expectedCase: {[key:string]: IConvertedNoun} = {
          genetiv: { defArticle: "des", noun: "Schiffes", indefArticle: "eines"}
        }

        it("genetiv", () => expect(unhandledCase.convertToCase("genetiv")).to.eql(expectedCase.genetiv))
      })
      /*      
      new NounCaseConverter('das', 'Schiff', false),

      ['Schiff(area)',  {defArticle: 'des', indefArticle: 'eines', noun: 'Schiffes'}],
      */
    })
  })
})

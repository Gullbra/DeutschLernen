import { caseConverterNoun, IConvertedNoun } from './caseConverter.ts'
import { expect } from 'chai';

const mockObject = {
  masculine:   {
    "word": "Abschluss",
    "weight": 150,
    "classes": [
      {
        "class": "noun",
        "article": "der",
        "plural": "Abschlüsse",
        "translation": [
          "conclusion",
          "diploma",
          "close",
          "completion",
          "degree",
          "end"
        ]
      }
    ]
  },
  neuter:   {
    "word": "Mitglied",
    "weight": 150,
    "classes": [
      {
        "class": "noun",
        "article": "das",
        "plural": "Mitglieder",
        "translation": [
          "member",
          "fellow"
        ]
      }
    ]
  },
  feminine: {
    "word": "Tasche",
    "weight": 100,
    "classes": [
      {
        "class": "noun",
        "article": "die",
        "plural": "Taschen",
        "translation": [
          "bag",
          "pocket",
          "case",
          "pouch",
          "purse"
        ]
      }
    ]
  },
}

const runs = [
  {
    type: "masculine",
    input: { word: mockObject.masculine.word, article: mockObject.masculine.classes[0].article, plural: false}
  },
  {
    type: "neuter",
    input: { word: mockObject.neuter.word, article: mockObject.neuter.classes[0].article, plural: false}
  },
  {
    type: "feminine",
    input: { word: mockObject.feminine.word, article: mockObject.feminine.classes[0].article, plural: false}
  },
  {
    type: "plural",
    input: { word: mockObject.masculine.classes[0].plural, article: mockObject.masculine.classes[0].article, plural: true}
  },
]

describe ("caseConverter() tests:", () => {  
  describe("Validation testing:", () => {
    const wrappedFuncion = (arg: string): IConvertedNoun =>  {return caseConverterNoun("", "", false, true, arg)};

    it("should not accept bad cases", () => {
      try {
        expect(() => wrappedFuncion('aeg')).to.throw()
      } catch (err) {
        expect(true).to.equal(false)
      }
    })

    it("should, for now, throw error when trying to convert an irregular noun to genetiv", () => {
      try {
        expect(() => caseConverterNoun("", "", false, false, 'genetiv')).to.throw()
      } catch (err) {
        expect(true).to.equal(false)
      }
    })

    describe("looping", () => {
      (['akusativ', 'dativ', 'genetiv'] as string[]).forEach((run: string) => {
        it(`Should accept case "${run}"`, () => {
          try {
            expect(() => wrappedFuncion(run)).to.not.throw()
          } catch (err) {
            expect(true).to.equal(false)
          }
        })
      });
    })
  })

  describe("Should convert to akusativ:", () => {
    const wrappedFuncion = (article: string, word: string, plural: boolean): IConvertedNoun =>  {return caseConverterNoun(article, word, plural, true, 'akusativ')};
    const answers = [
      {article: 'den', noun: mockObject.masculine.word},
      {article: 'das', noun: mockObject.neuter.word},
      {article: 'die', noun: mockObject.feminine.word},
      {article: 'die', noun: mockObject.masculine.classes[0].plural}
    ]

    runs.forEach((run, index) => {
      it(`Should convert "${run.type}" genuses correctly to akusativ`, () => {
        expect(wrappedFuncion(run.input.article, run.input.word, run.input.plural)).to.eql(answers[index])
      })
    });
  })

  describe("Should convert to dativ:", () => {
    const wrappedFuncion = (article: string, word: string, plural: boolean): IConvertedNoun =>  {return caseConverterNoun(article, word, plural, true, 'dativ')};

    const answers = [
      {article: 'dem', noun: mockObject.masculine.word},
      {article: 'dem', noun: mockObject.neuter.word},
      {article: 'der', noun: mockObject.feminine.word},
      {article: 'den', noun: mockObject.masculine.classes[0].plural},
    ]

    runs.forEach((run, index) => {
      it(`Should convert "${run.type}" genuses correctly to akusativ`, () => {
        expect(wrappedFuncion(run.input.article, run.input.word, run.input.plural)).to.eql(answers[index])
      })
    });
  })

  describe("Should convert to genetiv:", () => {
    const wrappedFuncion = (article: string, word: string, plural: boolean): IConvertedNoun =>  {return caseConverterNoun(article, word, plural, true, 'genetiv')};

    const answers = [
      {article: 'des', noun: "Abschlusses"},
      {article: 'des', noun: "Mitglieds"},
      {article: 'der', noun: "Tasche"},
      {article: 'der', noun: "Abschlüsse"},
    ]

    runs.forEach((run, index) => {
      it(`Should convert "${run.type}" genuses correctly to akusativ`, () => {
        expect(wrappedFuncion(run.input.article, run.input.word, run.input.plural)).to.eql(answers[index])
      })
    });
  })
})

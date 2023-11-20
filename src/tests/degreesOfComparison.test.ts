import { DegreesOfComparison } from "../game/gramarHandlers/degreesOfComparison";
import { expect } from 'chai';


describe.only("DegreesOfComparison() tests:", () => {
  const testCases = [
    { stem: "schnell", positive: "schnell", comparative: "schneller", superlative: "am schnellsten" },
    { stem: "läng", positive: "lange", comparative: "länger", superlative: "am längsten" },
    { stem: "heiß" ,positive: "heiß", comparative: "heißer", superlative: "am heißesten" },
    { stem: "nass" ,positive: "nasse", comparative: "nasser", superlative: "am nassesten" },
  ]

  testCases.forEach(tCase => {
    describe(`${tCase.positive} should`, () => {
      it(`be ${tCase.comparative} in comparative`, () => expect(DegreesOfComparison.convert(tCase.stem, 'comparative')).to.equal(tCase.comparative))
      it(`be ${tCase.superlative} in superlative`, () => expect(DegreesOfComparison.convert(tCase.stem, 'superlative')).to.equal(tCase.superlative))
    })
  })
})

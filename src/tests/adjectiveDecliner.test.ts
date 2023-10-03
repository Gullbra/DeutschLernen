import { AdjectiveDecliner } from "../game/gramarHandlers/adjectiveDeclension.ts";
import { expect } from 'chai';


describe.only('Should decline adjectives based on the nouns they describe,', () => {
  describe('if the noun is in definite(der, das, die) form,', () => {
    describe('the adjective should be declined with -en,', () => {
      it('when the noun is in plural.', () => { 
        throw new Error('not implemented!') 
      })
      it('when the noun is masculine akusativ.', () => { throw new Error('not implemented!') })
      it('when the noun is dativ or genetiv.', () => { throw new Error('not implemented!') })
    })
    describe('the adjective should be declined with -e,', () => {
      it('when not one of the above.', () => { throw new Error('not implemented!') })
    })
  })
  describe('if the noun is in indefinite(ein, eine, -) form,', () => {
    // describe('in the akusative case,', () => {
    //   it('adjektives should decline with (-er) .', () => { throw new Error('not implemented!') })

    // })
  })
})

/*
    bestämdform (der/den/dem/des, das/das/dem/des, die/die/der/der, die/die/den/der)
      nominativ (-e/-e/-e/-en):
        masculine:  der kleine heiße Kaffee
        neuter:     das kleine warme Sandwich
        feminine:   die kleine heiße Schokolade
        plural:     die kleinen heißen Schokoladen

      akusativ  (-en/-e/-e/-en)
        masculine:  (ich mag) den kleinen heißen kaffee
        neuter:     (ich mag) das kleine warme Sandwich
        feminine:   (ich mag) die kleine heiße Schokolade
        plural:     (ich mag) die kleinen heißen Schokolade

      dativ     (-en/-en/-en/-en)
        masculine:  (Ich gebe den Ball) dem kleinen glücklichen Mann
        neuter:     (Ich gebe den Ball) dem kleinen glücklichen Kind
        feminine:   (Ich gebe den Ball) der kleinen glücklichen Frau 
        plural:     (Ich gebe den Ball) den kleinen glücklichen Kindern

      Genetiv   (-en/-en/-en/-en)
        masculine:  (das Licht) des großen weißen Mondes
        neuter:     (das Licht) des großen weißen Elements
        feminine:   (das Licht) der großen weißen Sonne
        plural:     (das Licht) der großen weißen Elemente
*/ 

/*
    obestämd (ein/einen/einem/eines, ein/ein/einem/eines, eine/eine/einer/einer, viele/viele/vielen/vieler)
      nominativ  (-er/-es/-e/-e)
        masculine:  ein kleiner heißer Kaffee
        neuter:     ein kleines warmes Sandwich
        feminine:   eine kleine heiße Schokolade
        plural:     viele kleine warme Sandwiches

      akusativ   (-en/-es/-e/-e)
        masculine:  (ich nehme) einen kleinen heißen kaffee
        neuter:     (ich nehme) ein kleines warmes Sandwich
        feminine:   (ich nehme) eine kleine heiße Schokolade
        plural:     (Ich nehme) viele kleine heiße Schokoladen

      dativ      (-en/-en/-en/-en)
        masculine:  (Ich gebe den Ball) einem kleinen glücklichen Mann
        neuter:     (Ich gebe den Ball) einem kleinen glücklichen Kind
        feminine:   (Ich gebe den Ball) einer kleinen glücklichen Frau 
        plural:     (Ich gebe den Ball) vielen glücklichen kleinen Männern

      Genetiv    (-en/-en/-en/-er)
        masculine:  (das Licht) eines großen weißen Mondes
        neuter:     (das Licht) eines großen weißen Elements
        feminine:   (das Licht) einer großen weißen Sonne
        plural:     (das Licht) vieler großer weißer Sonnen
*/
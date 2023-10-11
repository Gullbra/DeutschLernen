import { AdjectiveDecliner } from "../game/gramarHandlers/adjectiveDeclension.ts";
import { expect } from 'chai';


describe.only('Should decline adjectives based on the nouns they describe;', () => {
  const obj = new AdjectiveDecliner('warm')


  describe.only('if the described noun is in definite(der, das, die) form, ', () => {
    describe('and in Nominativ, ', () => {
      it ("and in singular form, the adjective should be declined with -e ", () => {
        expect(obj.declineAdjective('nominativ', 'masculine', false, true)).to.equal('warme')
        expect(obj.declineAdjective('nominativ', 'neuter', false, true)).to.equal('warme')
        expect(obj.declineAdjective('nominativ', 'feminine', false, true)).to.equal('warme')
      })

      it ("and in plural form, the adjective should be declined with -en ", () => {
        expect(obj.declineAdjective('nominativ', 'masculine', true, true)).to.equal('warmen')
        expect(obj.declineAdjective('nominativ', 'neuter', true, true)).to.equal('warmen')
        expect(obj.declineAdjective('nominativ', 'feminine', true, true)).to.equal('warmen')
      })
    })


    describe.only('and in Akusative, ', () => {
      it ("and it's gender is masculine, the adjective should be declined with -en ", () => {
        expect(obj.declineAdjective('akusativ', 'masculine', false, true)).to.equal('warmen')
      })

      it ("and it's gender is either neuter or feminine, the adjective should be declined with -e ", () => {
        expect(obj.declineAdjective('akusativ', 'neuter', false, true)).to.equal('warme')
        expect(obj.declineAdjective('akusativ', 'feminine', false, true)).to.equal('warme')
      })

      it ("and in plural form, the adjective should be declined with -en ", () => {
        expect(obj.declineAdjective('akusativ', 'masculine', true, true)).to.equal('warmen')
        expect(obj.declineAdjective('akusativ', 'neuter', true, true)).to.equal('warmen')
        expect(obj.declineAdjective('akusativ', 'feminine', true, true)).to.equal('warmen')
      })
    })


    describe.only('and in Dativ, ', () => {
      it ("the adjective should be declined with -en ", () => {
        expect(obj.declineAdjective('dativ', 'masculine', false, true)).to.equal('warmen')
        expect(obj.declineAdjective('dativ', 'neuter', false, true)).to.equal('warmen')
        expect(obj.declineAdjective('dativ', 'feminine', false, true)).to.equal('warmen')
        expect(obj.declineAdjective('dativ', 'masculine', true, true)).to.equal('warmen')
        expect(obj.declineAdjective('dativ', 'neuter', true, true)).to.equal('warmen')
        expect(obj.declineAdjective('dativ', 'feminine', true, true)).to.equal('warmen')
      })
    })


    describe.only('and in Genetiv, ', () => {
      it ("the adjective should be declined with -en ", () => {
        expect(obj.declineAdjective('genetiv', 'masculine', false, true)).to.equal('warmen')
        expect(obj.declineAdjective('genetiv', 'neuter', false, true)).to.equal('warmen')
        expect(obj.declineAdjective('genetiv', 'feminine', false, true)).to.equal('warmen')
        expect(obj.declineAdjective('genetiv', 'masculine', true, true)).to.equal('warmen')
        expect(obj.declineAdjective('genetiv', 'neuter', true, true)).to.equal('warmen')
        expect(obj.declineAdjective('genetiv', 'feminine', true, true)).to.equal('warmen')
      })
    })
  })



  describe.only('if the described noun is in indefinite(ein, eine, -) form,', () => {
    describe.only('and in Nominativ, ', () => {
      it ("and it's gender is masculine, the adjective should be declined with -er ", () => {
        expect(obj.declineAdjective('nominativ', 'masculine', false, false)).to.equal('warmer')
      })
      it ("and it's gender is neuter, the adjective should be declined with -es ", () => {
        expect(obj.declineAdjective('nominativ', 'neuter', false, false)).to.equal('warmes')
      })
      it ("and it's gender is feminine, the adjective should be declined with -e ", () => {
        expect(obj.declineAdjective('nominativ', 'feminine', false, false)).to.equal('warme')
      })

      it ("and in plural form, the adjective should be declined with -e ", () => {
        expect(obj.declineAdjective('nominativ', 'masculine', true, false)).to.equal('warme')
        expect(obj.declineAdjective('nominativ', 'neuter', true, false)).to.equal('warme')
        expect(obj.declineAdjective('nominativ', 'feminine', true, false)).to.equal('warme')
      })
    })


    describe.only('and in Akusativ, ', () => {
      it ("and it's gender is masculine, the adjective should be declined with -en ", () => {
        expect(obj.declineAdjective('akusativ', 'masculine', false, false)).to.equal('warmen')
      })
      it ("and it's gender is neuter, the adjective should be declined with -es ", () => {
        expect(obj.declineAdjective('akusativ', 'neuter', false, false)).to.equal('warmes')
      })
      it ("and it's gender is feminine, the adjective should be declined with -e ", () => {
        expect(obj.declineAdjective('akusativ', 'feminine', false, false)).to.equal('warme')
      })

      it ("and in plural form, the adjective should be declined with -e ", () => {
        expect(obj.declineAdjective('akusativ', 'masculine', true, false)).to.equal('warme')
        expect(obj.declineAdjective('akusativ', 'neuter', true, false)).to.equal('warme')
        expect(obj.declineAdjective('akusativ', 'feminine', true, false)).to.equal('warme')
      })
    })


    describe.only('and in Dativ, ', () => {
      it ("the adjective should be declined with -en ", () => {
        expect(obj.declineAdjective('dativ', 'masculine', false, false)).to.equal('warmen')
        expect(obj.declineAdjective('dativ', 'neuter', false, false)).to.equal('warmen')
        expect(obj.declineAdjective('dativ', 'feminine', false, false)).to.equal('warmen')
        expect(obj.declineAdjective('dativ', 'masculine', true, false)).to.equal('warmen')
        expect(obj.declineAdjective('dativ', 'neuter', true, false)).to.equal('warmen')
        expect(obj.declineAdjective('dativ', 'feminine', true, false)).to.equal('warmen')
      })
    })


    describe.only('and in Genetiv, ', () => {
      it ("and in singular form, the adjective should be declined with -en ", () => {
        expect(obj.declineAdjective('genetiv', 'masculine', false, false)).to.equal('warmen')
        expect(obj.declineAdjective('genetiv', 'neuter', false, false)).to.equal('warmen')
        expect(obj.declineAdjective('genetiv', 'feminine', false, false)).to.equal('warmen')
      })

      it ("and in plural form, the adjective should be declined with -er ", () => {
        expect(obj.declineAdjective('genetiv', 'masculine', true, false)).to.equal('warmer')
        expect(obj.declineAdjective('genetiv', 'neuter', true, false)).to.equal('warmer')
        expect(obj.declineAdjective('genetiv', 'feminine', true, false)).to.equal('warmer')
      })
    })
  })
})
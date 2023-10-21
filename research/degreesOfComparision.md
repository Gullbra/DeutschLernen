
# Degrees of Comparision

For adverbs and adjectives.

Types:
* Positive (normal. like nominativ for cases or presens for tempus)
* Comparative
* Superlative

## Adverbs
Quite simple. The declensions arn't based on the verb it's describing.

* ``Absolut adbverbs`` (adverbs that doesn't make sense in comparative or superlative. ex: sogar) doesn't have have degrees of comparision.

* ``Comparative`` are declined with ``-er``.

* ``Superlativ`` is declined with ``-sten``, and preceded with ``am``.

* The stem ``might take an umlaut``, and it might ``shave of an ending vocal``. No good rule exists for which ones takes and umlaut, one syllable words does it more often than not, but not often enough to write it in as logic in this code. <sup>[[1]](#1)</sup> The stem of each adverb should be included in it's data object.
* the adverb might have to insert an ``-e-`` inbetwen declension and stem in ``superlative`` when the stem ends with s.   

examples (and future test cases):
```
Ich gehe schnell
Ich gehe schneller
Ich gehe am schnellsten

Ich warte lange
Ich warte länger
Ich warte am längsten

sieht heiß aus
sieht heißer aus
sieht am heißesten aus
```

## Adjectives

More complex (komplizirter). Sometimes unhelpfully so.
* Both comparative and superlative are ``first declined like adverbs`` based on the degree of comparision, then once more based on the noun they're describing. 

* What has to be considered:
  * Stem of degree of comparativ (``umlat`` or not), loss of ``trailing -e``.
  * if described noun is in ``definite`` or ``indefinite`` form.
  * the ``gender`` or ``plural`` of the described noun.
  * the ``case`` of the described noun.

* Adjective superlative doesn't have to be preceded with ``am``, and seem to only be declined with ``-st`` before it's declined based on the noun.
  ```
  das schnelle Kind => das schnellere Kind => das schnellste Kind
  ```

## Thoughts on Application
Have one class for degree of comparision construction and one for adjective specific declension.

Using existing AdjectiveDecliner:
```js
const convertedAdverbObj = DegreesOfComparision().convert(wordStem, degreeOfComparision)

const convertedAdjectiveObj = new AdjectiveDecliner(
  DegreesOfComparision.convert(wordStem, degreeOfComparision)
).convert(
  nounCase,
  nounGender,
  nounIsPlural,
  nounArticleIsDefinite
)
```

Rewrite of everything
``` typescript
class DegreesOfComparision {
  convert(stem: string, degreeOfComparision: string): string
}

class AdjectiveDecliner {
  convert(
    adjective: string,
    stem: string, 
    degreeOfComparision: string, 

    nounGenderOrPlural: string, 
    nounCase: string, 
    nounArticleIsDefinite: boolean
  ): string {
    const workingAdjective = (() => {
      if(degreeOfComparision === "positive")
        return adjective

      const modAdjective = DegreesOfComparision.convert(stem, degreeOfComparision)

      if(degreeOfComparision === "superlative")
        // return modAdjective without "am" preposition and "-en" ending

      return modAdjective
    }) ()
    
    return convertBasedOnNoun(workingAdjective, ...nounVariables)
  }
}
```


## References

<a name="pookie"></a>[1] https://www.jstor.org/stable/313375?seq=4

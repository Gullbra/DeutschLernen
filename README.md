# DeutschLernen
Just a little thing to help me expand my german vocabulary.

*Nur ein kleines Ding, um meinen Vokalbeln zu verbesseren.*

## Why am I doing this?
The combination of youtube-lessons, watching german-language content and Doulingo has helped me understand german pretty quickly. But there are some medium-common words I find myself repeatedly looking up. I want a simple way to target-practise these words. 

## Progress:
### 0.1.0
<hr>

#### done:
* Game mechanic works. Asking questions, calculating score, restart option.
* New data format: 
```JavaScript
{
  "word": {
    "word class1": {
      "translation": ["meaning1", "meaning2", "meaning3"],
    },
    "word class2": {
      "translation": ["meaning1", "meaning2", "meaning3"],
    },
    ...
  }
  ...
}
```

#### next on backlog:
* Implementing a weight system for choosing questions based on previous scores. 
* Writing to data to JSON file

### 0.0.0
<hr>

#### Initial plan:
##### MVP:
* Store data in JSON format:
```javascript 
{
  "word": ["meaning1", "meaning2", "meaning3"],
  ...
}
```
* trim and handle answers case(programmingwise) before evaluating answers

##### Would be nice: 
* Work out some type of handleling misspelling (like duolingo does). Maybe accepting answers with number of correct letters over a certain percentage? There might exist a library for this. Should also be aware of the important parts of the word, which always must be correct, eg "keine" should always have an e at the end, but should accept a misspelling like for example "kdine".
* Should be able to add new word easily through cli or other type of interface
* Use better pseudorandomizing than ``Math.random``
* Add a weight key to dataobjects. Initial thought: weights should start at 100, and decreese by 10% with a correct answer. They should increse by a lower number with a wrong answer, like 5% or maybe even a fix amount.

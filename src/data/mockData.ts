import { IClassAdjective, IClassNoun, IWord } from "../util/interfaces.ts";

export const mockDataPrepositions: IWord[] = [
  // {
  //   word: "durch",
  //   weight: 100,
  //   classes: [
  //     {
  //       class: "preposition",
  //       translation: [
  //         "through", "by", "due to", "via", "by way of", "thru", "per"
  //       ],
  //       forcesCase: "akusativ",
  //       commonUses: [
  //         { example: "der Einbrecher stieg durch das Fenster", translation: "the burglar climbed through the window" },
  //         { example: "wir rennen durch die Straßen", translation: "we run through the streets" },
  //         { example: "die Fabrik wurde durch einen Brand vernichtet", translation: "the factory was destroyed by fire" },
  //         { example: "durch Beharrlichkeit kommt man ans Ziel", translation: "through persistence you reach your goal" }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   word: "für",
  //   weight: 100,
  //   classes: [
  //     {
  //       class: "preposition",
  //       translation: [
  //         "for", "in favor of", "considering", "in return for", "instead of", "in place of"
  //       ],
  //       forcesCase: "akusativ",
  //       commonUses: [
  //       ]
  //     }
  //   ]
  // }
]

export const mockDataOtherWords: IWord[] = [
  // {
  //   "word": "verlassen",
  //   "weight": 100,
  //   "classes": [
      // {
      //   "class": "verb",
      //   "translation": ["abandon", "exit", "quit", "desert"]
      // },
  //     {
  //       "class": "adjective",
  //       "translation": ["abandoned", "deserted", "forlorn", "desolate"]
  //     }
  //   ]
  // },
  // {
  //   "word": "ausdrücken",
  //   "weight": 100,
  //   "classes": [
  //     {
  //       "class": "verb",
  //       "translation": ["express", "press out", "squeeze out", "verbalize"]
  //     }
  //   ]
  // },
  // {
  //   "word": "häuflich",
  //   "weight": 100,
  //   "classes": [
  //     {
  //       "class": "adjective",
  //       "translation": ["often", "frequent", "repeatedly"],
  //       comparative: {
  //         word: "häuflicher",
  //         translation: "more often"
  //       },
  //       superlative: {
  //         word: "am häufligsten",
  //         translation: "most often"
  //       },
  //       testPhrases: [

  //       ]
  //     }
  //   ]
  // },

  // {
  //   "word": "empfehlen",
  //   "weight": 100,
  //   "classes": [
  //     {
  //       "class": "verb",
  //       "translation": ["recommend", "advise", "commend"]
  //     }
  //   ]
  // },

  // {
  //   "word": "verabreden",
  //   "weight": 100,
  //   "classes": [
  //     {
  //       "class": "verb",
  //       "translation": ["arrange", "appoint", "agree upon", "make an appointment"]
  //     }
  //   ]
  // },

  {
    "word": "tatsächlich",
    "weight": 100,
    "classes": [
      {
        "class": "adverb",
        "translation": ["indeed", "in fact", "really", "objectively", "actually"],
        absoluteAdverb: false,
        comparative: {
          word: "tatsächlicher",
          translation: "more objectively"
        },
        superlative: {
          word: "am tatsächlichsten",
          translation: "most objectively"
        },
        testPhrases: [
          {
            dividedPhrase: ["Er spricht", "."],
            translation: ["He speaks", "."]
          }
        ]
      },
      // {
      //   "class": "adjective",
      //   "translation": ["real", "true", "effective", "actual"]
      // }
    ]
  },

  {
    "word": "neidisch",
    "weight": 100,
    "classes": [
      // {
      //  "class": "adjective",
      //   "translation": ["envious", "jealous", "grudging"]
      // },
      {
        "class": "adverb",
        "translation": ["jealously"],
        absoluteAdverb: false,
        comparative: {
          word: "neidischer",
          translation: "more jealously"
        },
        superlative: {
          word: "am neidischsten",
          translation: "most jealously"
        },
        testPhrases: [
          {
            dividedPhrase: ["Er spricht","."],
            translation: ["He speaks", "."]
          }
        ]
      }
    ]
  },

  {
    "word": "fähig",
    "weight": 100,
    "classes": [
      // {
      //   "class": "adjective",
      //   "translation": ["capable", "able", "competent", "proficient"]
      // },
      {
        "class": "adverb",
        "translation": ["ably", "competently", "proficiently"],
        absoluteAdverb: false,
        comparative: {
          word: "fähiger",
          translation: "more capable"
        },
        superlative: {
          word: "am fähigsten",
          translation: "most capable"
        },
        testPhrases: [
          {
            dividedPhrase: ["Unter allen meinen Kollegen bin ich",",komplexe Probleme zu lösen."],
            translation: ["Among all my colleagues, I am the", "of solving complex problems."]
          },
          {
            dividedPhrase: ["Sie ist","."],
            translation: ["She is", "."]
          }
        ]
      },
    ]
  },

  // {
  //   "word": "überfordern",
  //   "weight": 100,
  //   "classes": [
  //     {
  //       "class": "verb",
  //       "translation": ["overwhelm", "ask too much of"]
  //     }
  //   ]
  // },

  {
    "word": "wahrscheinlich",
    "weight": 100,
    "classes": [
      {
        "class": "adverb",
        "translation": ["probably", "presumably"],
        absoluteAdverb: false,
        comparative: {
          word: "wahrscheinlicher",
          translation: "more probably"
        },
        superlative: {
          word: "am wahrscheinlicher",
          translation: "most probably"
        },
        testPhrases: [
          {
            dividedPhrase: ["Es ist", "dass sie Eis mag"],
            translation: ["it is", "that she likes ice cream"]
          }
        ]
      },
      // {
      //   "class": "adjective",
      //   "translation": ["likely", "probable", "plausible"]
      // }
    ]
  },

  {
    "word": "wütend",
    "weight": 100,
    "classes": [
      {
        "class": "adjective",
        "translation": ["angry", "furious"],
        absoluteAdverb: false,
        comparative: {
          word: "wütender",
          translation: "angrier"
        },
        superlative: {
          word: "am wütendsten",
          translation: "the angriest"
        },
        testPhrases: [
          {
            dividedPhrase: ["Ich bin",""],
            translation: ["I'm",""]
          }
        ]
      }
    ]
  },

  // {
  //   "word": "böse",
  //   "weight": 100,
  //   "classes": [
  //     {
  //       "class": "adjective",
  //       "translation": ["evil", "angry", "bad", "nasty", "mad", "vicious"]
  //     }
  //   ]
  // },

  // {
  //   "word": "legen",
  //   "weight": 100,
  //   "classes": [
  //     {
  //       "class": "verb",
  //       "translation": ["put", "set", "lay", "situate"]
  //     }
  //   ]
  // },

  // {
  //   "word": "warnen",
  //   "weight": 100,
  //   "classes": [
  //     {
  //       "class": "verb",
  //       "translation": ["to warn", "warn", "alert", "alarm", "caution"]
  //     }
  //   ]
  // },

  // {
  //   "word": "vorwarnen",
  //   "weight": 100,
  //   "classes": [
  //     {
  //       "class": "verb",
  //       "translation": ["forewarn"]
  //     }
  //   ]
  // },

  // {
  //   "word": "räumen",
  //   "weight": 100,
  //   "classes": [
  //     {
  //       "class": "verb",
  //       "translation": ["clear", "evacuate", "move"]
  //     }
  //   ]
  // },

  // {
  //   "word": "anziehen",
  //   "weight": 100,
  //   "classes": [
  //     {
  //       "class": "verb",
  //       "translation": ["put on", "attract", "wear"]
  //     }
  //   ]
  // },  

  // {
  //   "word": "ausziehen",
  //   "weight": 100,
  //   "classes": [
  //     {
  //       "class": "verb",
  //       "translation": ["get undressed", "move out", "take off"]
  //     }
  //   ]
  // },

  // {
  //   "word": "umziehen",
  //   "weight": 100,
  //   "classes": [
  //     {
  //       "class": "verb",
  //       "translation": ["move house", "move"]
  //     }
  //   ]
  // },

  // {
  //   "word": "ziehen",
  //   "weight": 100,
  //   "classes": [
  //     {
  //       "class": "verb",
  //       "translation": ["pull", "drag", "draw", "pull out"]
  //     }
  //   ]
  // },

  // {
  //   "word": "überprüfen",
  //   "weight": 100,
  //   "classes": [
  //     {
  //       "class": "verb",
  //       "translation": ["check", "review", "verify", "inspect", "scrutinize"]
  //     }
  //   ]
  // },

  // {
  //   "word": "scheinen",
  //   "weight": 100,
  //   "classes": [
  //     {
  //       "class": "verb",
  //       "translation": ["seem", "appear", "shine"]
  //     }
  //   ]
  // },

  // {
  //   "word": "schauen",
  //   "weight": 100,
  //   "classes": [
  //     {
  //       "class": "verb",
  //       "translation": ["look", "behold", "glance"]
  //     }
  //   ]
  // },

  // {
  //   "word": "zeigen",
  //   "weight": 100,
  //   "classes": [
  //     {
  //       "class": "verb",
  //       "translation": ["show", "point", "demonstrate", "indicate", "display", "reveal", "present"]
  //     }
  //   ]
  // },

  // {
  //   word: "unentschieden",
  //   weight: 100,
  //   classes: [
  //     {
  //       class: "adjective",
  //       translation: ["draw", "undecided", "indecisive", "undetermined"]
  //     }
  //   ]
  // },

  {
    "word": "bloß",
    "weight": 100,
    "classes": [
      {
        "class": "adverb",
        "translation": [
          "just",
          "merely",
          "purely",
          "only"
        ],
        absoluteAdverb: true,
        comparative: {word:'', translation: ''},
        superlative: {word: '', translation: ''},
        testPhrases: []
      },
    ]
  },
  {
    "word": "wohl",
    "weight": 75,
    "classes": [
      {
        "class": "adverb",
        "translation": [
          "probably",
          "well",
          "perhaps",
          "surely",
          "perhaps",
          "no doubt"
        ],
        absoluteAdverb: true,
        comparative: {word:'', translation: ''},
        superlative: {word: '', translation: ''},
        testPhrases: []
      }
    ]
  },
  {
    "word": "sogar",
    "weight": 56,
    "classes": [
      {
        "class": "adverb",
        "translation": [
          "even"
        ],
        absoluteAdverb: true,
        comparative: {word:'', translation: ''},
        superlative: {word: '', translation: ''},
        testPhrases: []
      }
    ]
  },
  {
    "word": "überhaupt",
    "weight": 75,
    "classes": [
      {
        "class": "adverb",
        "translation": [
          "at all",
          "anyhow",
          "anyway",
          "in general",
          "after all"
        ],
        absoluteAdverb: true,
        comparative: {word:'', translation: ''},
        superlative: {word: '', translation: ''},
        testPhrases: []
      }
    ]
  },
]

export const mockDataNouns: { word: string, weight: number, classes: IClassNoun[] }[] = [
]
import { IClassAdjective, IClassNoun, IWord } from "../util/interfaces.ts";

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
  //         word: 'häuflicher', 
  //         translation: 'more often', 
  //         useInPhrase: [
  //           {
  //             phrase: "ich gehe häuflicher zum Arzt als dich",
  //             translation: "I'm going more more often to the doctor than you"
  //           }
  //         ]},
  //       superlative: {
  //         word: 'am häufligsten', 
  //         translation: 'most often', 
  //         useInPhrase: [
  //           {
  //             phrase: "Unter meinen Kollegen bin ich derjenige, der am häufigsten zum Arzt geht",
  //             translation: "Among my colleagues, I'm the one who most frequently goes to the doctor"
  //           }
  //         ]
  //       },
  //       declension: {
  //         definite: {
  //           nominativ: {

  //           }
  //         }
  //       }
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
        absoluteAdverb: true,
        comparative: {word:'', translation: '', useInPhrase: []},
        superlative: {word: '', translation: '', useInPhrase: []},
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
          translation: "more jealously",
          useInPhrase: [
            {
              phrase: "Er ist neidischer als ich",
              translation: "He is more envious than I am"
            },
            {
              phrase: "Er schaute neidischer auf das neue Auto",
              translation: "He looked more enviously at the new car"
            }
          ]
        }, 
        superlative: {
          word: "am neidischsten",
          translation: "most jealously",
          useInPhrase: [
            {
              phrase: "Er ist am neidischsten in unsere Gruppe",
              translation: "He is the most envious in our group"
            }
          ]
        },
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
          translation: "more capable",
          useInPhrase: [
            {
              phrase: "Sie arbeitet fähiger als ihre Kollegen",
              translation: "She works more capably than her colleagues"
            },
            {
              phrase: "Er spricht fähiger Deutsch als ich",
              translation: "He speaks more capably German than I do"
            }
          ]
        },
        superlative: {
          word: "am fähigsten",
          translation: "most capable",
          useInPhrase: [
            {
              phrase: "Sie arbeitet am fähigsten",
              translation: "She works the most competently"
            },
          ]
        },
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
          translation: "more probably",
          useInPhrase: [
            {
              phrase: "Es ist wahrscheinlicher, dass er morgen kommt",
              translation: "It is more likely that he will come tomorrow"
            },
            {
              phrase: "Sie wird wahrscheinlicher gewinnen als die anderen",
              translation: "She will win more likely than the others"
            }
          ]
        },
        superlative: {
          word: "am wahrscheinlichsten",
          translation: "most probably",
          useInPhrase: [
            {
              phrase: "Er ist am wahrscheinlichsten der Beste in seinem Fach",
              translation: "He is most likely the best in his field"
            },
            {
              phrase: "Das ist am wahrscheinlichsten die beste Lösung",
              translation: "That is most likely the best solution"
            }
          ]
        },
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
          translation: "angrier",
          useInPhrase: [
            {
              phrase: "sie schrie immer wütender",
              translation: "she screamed more and more angrily"
            }
          ]
        },
        superlative: {
          word: "am wütendsten",
          translation: "the angriest",
          useInPhrase: [
            {
              phrase: "sie schrie Tom am wütendsten an",
              translation: "she shouted most angrily at Tom"
            }
          ]
        },
      }
    ]
  },

  // {
  //   "word": "böse",
  //   "weight": 100,
  //   "classes": [
  //     {
  //       "class": "adjective",
  //       "translation": ["evil", "angry", "bad", "nasty", "mad", "vicious"],
  //       declension: {
  //         definite: {
  //           nominativ: {
  //             exercisePhrase: "{asticle} {translation} {noun}"
  //           }
  //         }
  //       }
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
        comparative: {word:'', translation: '', useInPhrase: []},
        superlative: {word: '', translation: '', useInPhrase: []},
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
        comparative: {word:'', translation: '', useInPhrase: []},
        superlative: {word: '', translation: '', useInPhrase: []},
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
        comparative: {word:'', translation: '', useInPhrase: []},
        superlative: {word: '', translation: '', useInPhrase: []},
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
        comparative: {word:'', translation: '', useInPhrase: []},
        superlative: {word: '', translation: '', useInPhrase: []},
      }
    ]
  },
]

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

export const mockDataNouns: { word: string, weight: number, classes: IClassNoun[] }[] = [
]
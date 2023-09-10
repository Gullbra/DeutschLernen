import { IClassPreposition, IWord } from "../util/interfaces.ts";

export const mockDataNoun: IWord[] = [
  {
    "word": "Stimmung",
    "weight": 100,
    "classes": [
      {
        "class": "noun",
        "article": "die",
        "translation": ["humor", "mood", "atmosphere", "feeling", "spirit", "disposition", "temper"]
      }
    ]
  },

  {
    "word": "Mischung",
    "weight": 100,
    "classes": [
      {
        "class": "noun",
        "article": "die",
        "translation": ["mix", "mixture", "combination", "blend"]
      }
    ]
  },

  {
    "word": "Ausdruck",
    "weight": 100,
    "classes": [
      {
        "class": "noun",
        "article": "der",
        "translation": ["expression", "term", "phrase"]
      }
    ]
  },

  {
    "word": "Müll",
    "weight": 100,
    "classes": [
      {
        "class": "noun",
        "article": "der",
        "translation": ["garbage", "trash", "junk", "waste", "rubbish"]
      }
    ]
  },

  {
    "word": "Miststück",
    "weight": 100,
    "classes": [
      {
        "class": "noun",
        "article": "das",
        "translation": ["bitch", "bastard"]
      }
    ]
  },

  {
    "word": "Untershied",
    "weight": 100,
    "classes": [
      {
        "class": "noun",
        "article": "der",
        "translation": ["diffrence", "distinction", "differential", "variation"]
      }
    ]
  },

  {
    "word": "Böse",
    "weight": 100,
    "classes": [
      {
        "class": "noun",
        "article": "das",
        "translation": ["evil"]
      }
    ]
  },

  {
    "word": "Erfolge",
    "weight": 100,
    "classes": [
      {
        "class": "noun",
        "article": "die",
        "translation": ["success", "achievement"]
      }
    ]
  },

  {
    "word": "Beziehung",
    "weight": 100,
    "classes": [
      {
        "class": "noun",
        "article": "die",
        "translation": ["relationship", "relation", "connection", "correlation", "contact"]
      }
    ]
  }, 

  {
    "word": "Flügel",
    "weight": 100,
    "classes": [
      {
        "class": "noun",
        "article": "der",
        "translation": ["wing", "blade", "piano", "sail"]
      }
    ]
  },

  {
    "word": "Blödsinn",
    "weight": 100,
    "classes": [
      {
        "class": "noun",
        "article": "der",
        "translation": ["nonsense", "rubbige", "piano", "sail"]
      }
    ]
  },

  {
    "word": "Sinn",
    "weight": 100,
    "classes": [
      {
        "class": "noun",
        "article": "der",
        "translation": ["sence", "meaning", "signification", "feeling"]
      }
    ]
  },

  {
    "word": "Fahndung",
    "weight": 100,
    "classes": [
      {
        "class": "noun",
        "article": "die",
        "translation": ["manhunt", "search"]
      }
    ]
  },

  {
    "word": "Beitrag",
    "weight": 100,
    "classes": [
      {
        "class": "noun",
        "article": "der",
        "translation": ["contribution", "article", "fee", "input", "premium"]
      }
    ]
  },

  {
    "word": "Empfänger",
    "weight": 100,
    "classes": [
      {
        "class": "noun",
        "article": "der",
        "translation": ["recipient", "receiver"]
      }
    ]
  },

  {
    "word": "Träger",
    "weight": 100,
    "classes": [
      {
        "class": "noun",
        "article": "der",
        "translation": ["carrier", "support", "bearer", "holder", "wearer", "strap", "sponsor"]
      }
    ]
  },

  {
    "word": "Berater",
    "weight": 100,
    "classes": [
      {
        "class": "noun",
        "article": "der",
        "translation": ["advisor", "consultant", "aide", "counselor"]
      }
    ]
  }
]

export const mockDataPrepositions: IWord[] = [
  {
    word: "bis",
    weight: 100,
    classes: [
      {
        class: "preposition",
        translation: [
          "until", "to", "up to", "till"
        ],
        forcesCase: "accusative",
        commonUses: [
          { example: "bis fünf Uhr", translation: "until five o'clock" },
          { example: "bis ich geheiratet habe", translation: "until I got married" },
          { example: "Bis die Kinder finanziell unabhängig sind", translation: "until the children are financially independent" }
        ]
      }
    ]
  },
  {
    word: "durch",
    weight: 100,
    classes: [
      {
        class: "preposition",
        translation: [
          "through", "by", "due to", "via", "by way of", "thru", "per"
        ],
        forcesCase: "accusative",
        commonUses: [
          { example: "der Einbrecher stieg durch das Fenster", translation: "the burglar climbed through the window" },
          { example: "wir rennen durch die Straßen", translation: "we run through the streets" },
          { example: "die Fabrik wurde durch einen Brand vernichtet", translation: "the factory was destroyed by fire" },
          { example: "durch Beharrlichkeit kommt man ans Ziel", translation: "through persistence you reach your goal" }
        ]
      }
    ]
  },
  {
    word: "für",
    weight: 100,
    classes: [
      {
        class: "preposition",
        translation: [
          "through", "by", "due to", "via", "by way of", "thru", "per"
        ],
        forcesCase: "accusative",
        commonUses: [
          { example: "der Einbrecher stieg durch das Fenster", translation: "the burglar climbed through the window" },
          { example: "wir rennen durch die Straßen", translation: "we run through the streets" },
          { example: "die Fabrik wurde durch einen Brand vernichtet", translation: "the factory was destroyed by fire" }
        ]
      }
    ]
  }
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
  //       "translation": ["often", "frequent", "repeatedly"]
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
        "translation": ["indeed", "in fact", "really", "objectively"]
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
        "translation": ["jealously"]
      }
    ]
  },

  
  {
    "word": "sogar",
    "weight": 100,
    "classes": [
      {
        "class": "adverb",
        "translation": ["even"]
      }
    ]
  },

  {
    "word": "fähig",
    "weight": 100,
    "classes": [
      // {
      //   "class": "adjective",
      //   "translation": ["able", "competent", "proficient"]
      // },
      {
        "class": "adverb",
        "translation": ["ably", "competently", "proficiently"]
      }
    ]
  },

  {
    "word": "überhaupt",
    "weight": 100,
    "classes": [
      {
        "class": "adverb",
        "translation": ["at all", "anyhow", "anyway", "in general", "after all"]
      }
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
        "translation": ["probably", "presumably"]
      },
      // {
      //   "class": "adjective",
      //   "translation": ["likely", "probable", "plausible"]
      // }
    ]
  },

  // {
  //   "word": "wütend",
  //   "weight": 100,
  //   "classes": [
  //     {
  //       "class": "adjective",
  //       "translation": ["angry", "furious"]
  //     }
  //   ]
  // },

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

  {
    "word": "wohl",
    "weight": 100,
    "classes": [
      {
        "class": "adverb",
        "translation": ["probably", "well", "perhaps", "surely", "perhaps", "no doubt"]
      }
    ]
  },

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

  {
    "word": "bloß",
    "weight": 100,
    "classes": [
      {
        "class": "adverb",
        "translation": ["just", "merely", "purely", "only"]
      }
    ]
  },

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
  // }
]
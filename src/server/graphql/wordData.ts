import { DataHandler } from "../../data/dataHandler";
import { TDataArray } from "../../interfaces/IDataStructures";
import { IWord } from "../../interfaces/IWordsPhrasesGrammar";

const db = new DataHandler().getGameData()

export const gameDataGql = {
  resolvers: {
    getDataList: async (): Promise<TDataArray> => {
      return await db
    }
  },

  schema: {
    types: `
      type IWordclass {
        class: String!
      }

      type IWord {
        word: String!
        classes: [IWordclass]
      }
    `,
    mutations: [],
    queries: [
      "getDataList: [IWord]"
    ]
  },
}

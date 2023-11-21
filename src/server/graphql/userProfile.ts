import { buildSchema } from "../../../node_modules/graphql/index";
import { DataHandler } from "../../data/dataHandler";
import { IRawUserProfile } from "../../interfaces/IDataStructures";
import { IWord } from "../../interfaces/IWordsPhrasesGrammar";

const db = new DataHandler().getJSONUserProfile()

export const userProfileGql = {
  resolvers: {
    getUserProfile: async (): Promise<IRawUserProfile> => {
      return await db
    }
  },

  schema: {
    types: `
      type SubQNoun {
        weight: Int!
      }

      type IRawUserProfile {
        noun: SubQNoun
      }
    `,
    mutations: [

    ],
    queries: [
      'getUserProfile: IRawUserProfile'
    ]
  },
}

/*
      subQuestions: {
        meaning: Int!,
        article: Int!,
        plural: Int!,
        case: Int!
      },
*/

/*
      adverb: {
        subQuestions: {
          meaning: Int!,
          degreesOfComparisionComperativ: Int!,
          degreesOfComparisionSuperlativ: Int!
        },
        weight: Int!
      }
*/
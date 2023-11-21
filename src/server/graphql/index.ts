import { gameDataGql } from "./wordData";
import { userProfileGql } from "./userProfile";
import { buildSchema } from "../../../node_modules/graphql/index";
import { gqlSchemaCombiner } from "../util/gqlSchemaCombiner";

export const qraphqlSettings = {
  resolvers: {
    ...gameDataGql.resolvers, 
    ...userProfileGql.resolvers
  },

  schema: buildSchema(gqlSchemaCombiner(userProfileGql.schema, gameDataGql.schema))
}

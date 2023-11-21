
export interface IGqlSchemaObj {
  types: string
  mutations: string[]
  queries: string[]
}
export const gqlSchemaCombiner = (...schemas: IGqlSchemaObj[]): string => {
  const combinedTypes = schemas.map(schema => schema.types).join('\n')
  const combinedQueries = schemas.map(schema => schema.queries).flat()
  const combinedMutations = schemas.map(schema => schema.mutations).flat()

  return combinedTypes + `${
    combinedQueries.length > 0
      ? `type Query {\n${combinedQueries.join('\n')}\n}`
      : ""
  }` + `${
    combinedMutations.length > 0
      ? `type Mutation {\n${combinedMutations.join('\n')}\n}`
      : ""
  }`
}

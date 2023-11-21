import { gqlSchemaCombiner, IGqlSchemaObj } from "../server/util/gqlSchemaCombiner";
import { expect } from 'chai';

describe.only("gqlSchemaCombiner()", () => {
  describe("combining types tests", ()=> {
    it("first test", () => {
      const testObjs: IGqlSchemaObj[] = [
        { types: "type Hey { answer: string }", mutations:[], queries:[] },
        { types: "type Goodbye { answer: string }", mutations:[], queries:[] },
      ]

      expect(gqlSchemaCombiner(...testObjs)).to.equal('type Hey { answer: string }\ntype Goodbye { answer: string }')
    })
  })

  describe("combining queries tests", ()=> {
    it("first test", () => {
      const testObjs: IGqlSchemaObj[] = [
        { types: "", queries:["getUser: String", "getUsers: [String]"], mutations:[] },
        { types: "", queries:["getData: Int"], mutations:[] },
      ]

      expect(gqlSchemaCombiner(...testObjs)).to.equal('\ntype Query {\ngetUser: String\ngetUsers: [String]\ngetData: Int\n}')
    })
  })

  describe("combining queries tests", ()=> {
    it("first test", () => {
      const testObjs: IGqlSchemaObj[] = [
        { types: "", mutations:["getUser: String", "getUsers: [String]"], queries:[] },
        { types: "", mutations:["getData: Int"], queries:[] },
      ]

      expect(gqlSchemaCombiner(...testObjs)).to.equal('\ntype Mutation {\ngetUser: String\ngetUsers: [String]\ngetData: Int\n}')
    })
  })
})
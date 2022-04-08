import "graphql-import-node";
import * as typeDefs from "./schema/schema.graphql";
import { makeExecutableSchema } from "graphql-tools";
import { GraphQLSchema } from "graphql";
import { resolvers } from "./resolverMap";

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

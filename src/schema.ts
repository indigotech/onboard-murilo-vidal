<<<<<<< HEAD
import "graphql-import-node";
import * as typeDefs from "./schema/schema.graphql";
import { makeExecutableSchema } from "graphql-tools";
import { GraphQLSchema } from "graphql";
import { resolvers } from "./resolverMap";
=======
import 'graphql-import-node';
import * as typeDefs from './schema/schema.graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolverMap';
import { GraphQLSchema } from 'graphql';
>>>>>>> c21e3ba (added eslint package)

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

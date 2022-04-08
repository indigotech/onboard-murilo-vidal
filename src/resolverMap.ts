import { IResolvers } from "@graphql-tools/utils";

export const resolvers: IResolvers = {
  Query: {
    helloWorld(): string {
      return '👋 Hello world! 👋';
    },
  },
};

import { IResolvers } from '@graphql-tools/utils';

export const resolvers: IResolvers = {
  Query: {
    helloWorld(): string {
<<<<<<< HEAD
      return '👋 Hello world! 👋';
=======
      return `👋 Hello world! 👋`;
>>>>>>> c21e3ba (added eslint package)
    },
  },
};

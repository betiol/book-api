// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';

type ErrorType = {
  path: string,
  message: string,
};

export default new GraphQLObjectType({
  name: 'Error',
  description: 'Error Type',
  fields: () => ({
    path: {
      type: GraphQLString,
      resolve: (error: ErrorType) => error.path,
    },
    message: {
      type: GraphQLString,
      resolve: (error: ErrorType) => error.message,
    },
  }),
});

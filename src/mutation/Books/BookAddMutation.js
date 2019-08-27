import { GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList } from 'graphql';

import { mutationWithClientMutationId } from 'graphql-relay';

import { Book } from '../../model';
import BookType from '../../type/BookType';
import ErrorType from '../../type/ErrorType';
import type { BookType as BType } from '../../loader/BookLoader';
import type { GraphQLContext } from '../../TypeDefinition';
import { bookAddValidationSchema } from '../../utils/schemaValidations';
import { USER_NOT_VALID } from '../../utils/errorMessages';
import { formatYupError } from '../../utils/formatYupError';

type Output = {
  message: string,
  error: string,
};

export default mutationWithClientMutationId({
  name: 'BookAdd',
  inputFields: {
    title: {
      type: GraphQLNonNull(GraphQLString),
      description: 'book name',
    },
    description: {
      type: GraphQLString,
      description: 'book description',
    },
    image: {
      type: GraphQLString,
    },
    price: {
      type: GraphQLNonNull(GraphQLInt),
    },
    stars: {
      type: GraphQLInt,
    },
    author: {
      type: GraphQLString,
    },
    purchaseUrl: {
      type: GraphQLNonNull(GraphQLString),
    },
    pages: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args: BType, context: GraphQLContext) => {
    try {
      await bookAddValidationSchema.validate(args, { abortEarly: false });
    } catch (error) {
      return {
        error: formatYupError(error),
      };
    }
    const { user } = context;

    if (!user) {
      return {
        error: [{ path: 'user', message: USER_NOT_VALID }],
      };
    }

    const data = new Book({ ...args });

    const book = await data.save();

    return {
      message: 'Book created with success',
      error: null,
      book,
    };
  },
  outputFields: {
    message: {
      type: GraphQLString,
      resolve: ({ message }: Output) => message,
    },
    error: {
      type: GraphQLList(ErrorType),
      resolve: ({ error }: Output) => error,
    },
    book: {
      type: BookType,
      resolve: ({ book }) => book,
    },
  },
});

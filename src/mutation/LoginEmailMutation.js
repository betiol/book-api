// @flow
import { GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import * as yup from 'yup';
import { User } from '../model';
import UserType from '../type/UserType';
import ErrorType from '../type/ErrorType';
import { generateToken } from '../auth';
import type { UType } from '../loader/UserLoader';
import { formatYupError } from '../utils/formatYupError';
import { INVALID_EMAIL_PASSWORD, USER_NOT_EXISTS } from '../utils/errorMessages';
import { loginValidationSchema } from '../utils/schemaValidations';
//validation schema for login

export default mutationWithClientMutationId({
  name: 'LoginEmail',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ email, password }: UType) => {
    try {
      await loginValidationSchema.validate({ email, password }, { abortEarly: false });
    } catch (error) {
      return {
        error: formatYupError(error),
      };
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return {
        token: null,
        error: [{ path: 'email', message: USER_NOT_EXISTS }],
      };
    }

    const correctPassword = user.authenticate(password);

    if (!correctPassword) {
      return {
        token: null,
        error: [{ path: 'email', message: INVALID_EMAIL_PASSWORD }],
      };
    }

    return {
      token: generateToken(user),
      error: null,
      user,
    };
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    error: {
      type: GraphQLList(ErrorType),
      resolve: ({ error }) => error,
    },
    user: {
      type: UserType,
      resolve: ({ user }) => user,
    },
  },
});

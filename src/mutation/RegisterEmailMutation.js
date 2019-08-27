// @flow
import { GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { User } from '../model';
import { generateToken } from '../auth';
import UserType from '../type/UserType';
import { registerValidationSchema } from '../utils/schemaValidations';
import { formatYupError } from '../utils/formatYupError';
import { EMAIL_ALREADY_EXISTS } from '../utils/errorMessages';
import ErrorType from '../type/ErrorType';

export default mutationWithClientMutationId({
  name: 'RegisterEmail',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ name, email, password }) => {
    try {
      await registerValidationSchema.validate({ name, email, password }, { abortEarly: false });
    } catch (error) {
      return {
        error: formatYupError(error),
      };
    }

    let findUser = await User.findOne({ email: email.toLowerCase() });

    if (findUser) {
      return {
        token: null,
        error: [{ path: 'email', message: EMAIL_ALREADY_EXISTS }],
      };
    }

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    return {
      token: generateToken(user),
      user,
      error: null,
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

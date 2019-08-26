// @flow
import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { User } from '../model';
import { generateToken } from '../auth';
import UserType from '../type/UserType';

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
		let user = await User.findOne({ email: email.toLowerCase() });

		if (user) {
			return {
				token: null,
				error: 'The email is already in use',
			};
		}

		user = new User({
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
			type: GraphQLString,
			resolve: ({ error }) => error,
		},
		user: {
			type: UserType,
			resolve: ({ user }) => user,
		},
	},
});

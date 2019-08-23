import { GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql';

import { mutationWithClientMutationId } from 'graphql-relay';

import { Book } from '../../model';
import BookType from '../../type/BookType';
import type { BookType as BType } from '../../loader/BookLoader';
import type { GraphQLContext } from '../../TypeDefinition';

type Output = {
	message: string,
	error: string
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
		const { user } = context;
		if (!user) {
			throw new Error('invalid user');
		}

		// @TODO improve validation logic
		// Create new record

		const data = new Book({
			...args,
			// owner: user._id,
		});

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
			type: GraphQLString,
			resolve: ({ error }: Output) => error,
		},
		book: {
			type: BookType,
			resolve: ({ book }) => book,
		},
	},
});

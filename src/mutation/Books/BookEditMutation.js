import { GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLID } from 'graphql';

import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';

import { Book } from '../../model';
import BookType from '../../type/BookType';
import type { BookType as BType } from '../../loader/BookLoader';
import type { GraphQLContext } from '../../TypeDefinition';

type Output = {
	message: string,
	error: string
};

export default mutationWithClientMutationId({
	name: 'BookEdit',
	inputFields: {
		id: {
			type: GraphQLNonNull(GraphQLID),
			description: 'book ID',
		},
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
		purchaseUrl: {
			type: GraphQLNonNull(GraphQLString),
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
		pages: {
			type: GraphQLNonNull(GraphQLString),
		},
	},
	mutateAndGetPayload: async (args: BType, context: GraphQLContext) => {
		const { user } = context;
		if (!user) {
			throw new Error('invalid user');
		}

		const { id } = args;

		// @TODO improve validation logic

		// Edit record
		const book = await Book.findOne({ _id: fromGlobalId(id).id });
		await book.set({ ...args }).save();

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

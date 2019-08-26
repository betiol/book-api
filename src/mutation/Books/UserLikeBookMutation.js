import { GraphQLString } from 'graphql';

import { mutationWithClientMutationId } from 'graphql-relay';

import { User, Book } from '../../model';
import type { BookType as BType } from '../../loader/BookLoader';
import type { GraphQLContext } from '../../TypeDefinition';
import UserType from '../../type/UserType';
import BookType from '../../type/BookType';

type Output = {
	message: string,
	error: string
};

export default mutationWithClientMutationId({
	name: 'UserLikeBook',
	inputFields: {
		book: {
			type: GraphQLString,
			description: 'book'
		}
	},
	mutateAndGetPayload: async (args: BType, context: GraphQLContext) => {
		const { user } = context;
		if (!user) {
			throw new Error('invalid user');
		}

		const findUser = await User.findOne({ _id: user._id });
		//check if the book is on list of the liked books
		const isOnLikedBooks = await findUser.likes.includes(args.book);

		const book = await Book.findOne({ _id: args.book });
		console.log(args.book);

		if (isOnLikedBooks) {
			const removeBook = findUser.likes.filter((x) => x.toString() !== args.book);
			const updateLikes = await User.updateOne(
				{ _id: user._id },
				{ $set: { likes: removeBook || [] } }
			);
			return {
				message: 'Added to favorites',
				error: null,
				user: updateLikes,
				book
			};
		}

		findUser.likes.push(args.book);

		await findUser.save();

		return {
			message: 'Added to favorites',
			error: null,
			user: findUser,
			book
		};
	},
	outputFields: {
		message: {
			type: GraphQLString,
			resolve: ({ message }: Output) => message
		},
		error: {
			type: GraphQLString,
			resolve: ({ error }: Output) => error
		},
		user: {
			type: UserType,
			resolve: ({ user }) => user
		},
		book: {
			type: BookType,
			resolve: ({ book }) => book
		}
	}
});

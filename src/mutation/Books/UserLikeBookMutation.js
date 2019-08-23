import { GraphQLString } from 'graphql';

import { mutationWithClientMutationId } from 'graphql-relay';

import { User } from '../../model';
import type { BookType as BType } from '../../loader/BookLoader';
import type { GraphQLContext } from '../../TypeDefinition';
import UserType from '../../type/UserType';
import mongoose from 'mongoose';

type Output = {
	message: string,
	error: string
};

export default mutationWithClientMutationId({
	name: 'UserLikeBook',
	inputFields: {
		book: {
			type: GraphQLString,
			description: 'book',
		},
	},
	mutateAndGetPayload: async (args: BType, context: GraphQLContext) => {
		const { user } = context;
		if (!user) {
			throw new Error('invalid user');
		}

		const findUser = await User.findOne({ _id: user._id });
		//check if the book is on list of the liked books
		const isOnLikedBooks = await findUser.likes.includes(args.book);

		if (isOnLikedBooks) {
			const removeBook = findUser.likes.filter((x) => x.toString() !== args.book);
			const updateLiked = await User.updateOne(
				{ _id: user._id },
				{ $set: { likes: removeBook || [] } }
			);
			return {
				message: 'Added to favorites',
				error: null,
				user: updateLiked,
			};
		}

		findUser.likes.push(args.book);

		await findUser.save();

		return {
			message: 'Added to favorites',
			error: null,
			user: findUser,
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
		user: {
			type: UserType,
			resolve: ({ user }) => user,
		},
	},
});

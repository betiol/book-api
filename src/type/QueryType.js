// @flow

import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import { connectionArgs, fromGlobalId } from 'graphql-relay';
import { NodeField } from '../interface/NodeInterface';

import UserType from './UserType';
import BookType from './BookType';

import { UserLoader } from '../loader';
import { BookLoader } from '../loader';

import UserConnection from '../connection/UserConnection';
import BookConnection from '../connection/BookConnection';

import type { GraphQLContext } from '../TypeDefinition';
import type { UserType as UserPayload } from '../loader/UserLoader';
import type { BookType as BookPayload } from '../loader/UserLoader';

type ConectionArguments = {
	search: string,
	first: number,
	after: String,
	last: number,
	before: string
};

type LoadByIdArgs = {
	id: string
};

export default new GraphQLObjectType({
	name: 'Query',
	description: 'The root of all... queries',
	fields: () => ({
		node: NodeField,
		me: {
			type: UserType,
			resolve: (root: UserPayload, args: void, context: GraphQLContext) =>
				context.user ? UserLoader.load(context, context.user._id) : null,
		},
		user: {
			type: UserType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
				},
			},
			resolve: (obj: UserPayload, args: LoadByIdArgs, context: GraphQLContext) => {
				const { id } = fromGlobalId(args.id);
				return UserLoader.load(context, id);
			},
		},
		book: {
			type: BookType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
				},
			},
			resolve: (obj: BookPayload, args: LoadByIdArgs, context: GraphQLContext) => {
				const { id } = fromGlobalId(args.id);
				return BookLoader.load(context, id);
			},
		},
		users: {
			type: UserConnection.connectionType,
			args: {
				...connectionArgs,
				search: {
					type: GraphQLString,
				},
			},
			resolve: (obj: UserPayload, args: ConectionArguments, context: GraphQLContext) =>
				UserLoader.loadUsers(context, args),
		},
		books: {
			type: BookConnection.connectionType,
			args: {
				...connectionArgs,
				search: {
					type: GraphQLString,
				},
			},
			resolve: (obj: BookPayload, args: ConectionArguments, context: GraphQLContext) =>
				BookLoader.loadBooks(context, args),
		},
		loadLikedBooks: {
			type: BookConnection.connectionType,
			args: {
				...connectionArgs,
				search: {
					type: GraphQLString,
				},
			},
			resolve: (obj: BookPayload, args: ConectionArguments, context: GraphQLContext) =>
				BookLoader.loadLikedBooks(context, args),
		},
	}),
});

// @flow

import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { NodeInterface } from '../interface/NodeInterface';

type BookType = {
	id: string,
	_id: string,
	title: string,
	description: string,
	image: string,
	author: string,
	price: number,
	stars: number,
	pages: string,
	purchaseUrl: string,
	likedByUser: boolean
};

export default new GraphQLObjectType({
	name: 'Book',
	description: 'Book data',
	fields: () => ({
		id: globalIdField('Book'),
		_id: {
			type: GraphQLString,
			resolve: (book: BookType) => book._id
		},
		title: {
			type: GraphQLString,
			resolve: (book: BookType) => book.title
		},
		description: {
			type: GraphQLString,
			resolve: (book: BookType) => book.description
		},
		price: {
			type: GraphQLInt,
			resolve: (book: BookType) => book.price
		},
		stars: {
			type: GraphQLInt,
			resolve: (book: BookType) => book.stars
		},
		author: {
			type: GraphQLString,
			resolve: (book: BookType) => book.author
		},
		image: {
			type: GraphQLString,
			resolve: (book: BookType) => book.image
		},
		purchaseUrl: {
			type: GraphQLString,
			resolve: (book: BookType) => book.purchaseUrl
		},
		likedByUser: {
			type: GraphQLBoolean,
			resolve: (book: BookType, args, context) =>
				!!context.user.likes.filter((x) => x.toString() === book._id.toString()).length
		},
		pages: {
			type: GraphQLString,
			resolve: (book: BookType) => book.pages
		}
	}),
	interfaces: () => [ NodeInterface ]
});

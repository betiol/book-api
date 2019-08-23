// @flow
import DataLoader from 'dataloader';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import type { ObjectId } from 'mongoose';
import type { ConnectionArguments } from 'graphql-relay';
import { Book as BookModel, User as UserModel } from '../model';

import type { GraphQLContext } from '../TypeDefinition';

export type BookType = {
	id: string,
	_id: ObjectId,
	title: string,
	description: string,
	image: string,
	author: string,
	stars: number,
	price: number,
	purchaseUrl: string,
	likedByUser: boolean
};

export default class Book {
	id: string;
	_id: ObjectId;
	description: string;
	author: string;
	image: string;
	stars: number;
	price: number;
	pages: string;
	purchaseUrl: string;
	likedByUser: boolean;

	constructor(data: BookType) {
		this.id = data.id;
		this._id = data._id;
		this.title = data.title;
		this.description = data.description;
		this.image = data.image;
		this.author = data.author;
		this.price = data.price;
		this.pages = data.pages;
		this.stars = data.stars;
		this.purchaseUrl = data.purchaseUrl;
		this.likedByUser = data.likedByUser;
	}
}

export const getLoader = () => new DataLoader((ids) => mongooseLoader(BookModel, ids));

const viewerCanSee = (context, data) => true;

export const load = async (context: GraphQLContext, id: string): Promise<?Book> => {
	if (!id) {
		return null;
	}

	let data;
	try {
		data = await context.dataloaders.BookLoader.load(id);
	} catch (err) {
		return null;
	}
	return viewerCanSee(context, data) ? new Book(data, context) : null;
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: string) =>
	dataloaders.BookLoader.clear(id.toString());

export const loadBooks = async (context: GraphQLContext, args: ConnectionArguments) => {
	const { user } = context;

	// if (!user) {
	// 	throw new Error('invalid user');
	// }

	let conditions = {};

	if (args.search) {
		conditions = {
			...conditions,
			title: {
				$regex: new RegExp(`${args.search}`, 'ig'),
			},
		};
	}

	const books = BookModel.find(conditions).sort({ createdAt: -1 });

	return connectionFromMongoCursor({
		cursor: books,
		context,
		args,
		loader: load,
	});
};

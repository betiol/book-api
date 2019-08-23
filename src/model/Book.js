//@flow
import mongoose from 'mongoose';

export type BookType = {
	title: string,
	description: string,
	author: string,
	price: number,
	stars: number,
	image: string,
	likedByUser: boolean
};

const Schema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		stars: {
			type: Number,
		},
		image: {
			type: String,
			required: true,
		},
		pages: {
			type: String,
			required: true,
		},
		purchaseUrl: {
			type: String,
			required: true,
		},
		likedByUser: {
			type: Boolean,
		},
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt',
		},
		collection: 'book',
	}
);

export default mongoose.model('Book', Schema);

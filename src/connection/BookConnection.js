// @flow

import { GraphQLInt } from 'graphql';

import { connectionDefinitions } from 'graphql-relay';

import BookType from '../type/BookType';

export default connectionDefinitions({
	name: 'Book',
	nodeType: BookType,
	connectionFields: {
		count: {
			type: GraphQLInt,
		},
	},
});

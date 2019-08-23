// @flow

import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { NodeInterface } from '../interface/NodeInterface';

type UserType = {
	_id: string,
	name: string,
	email: string,
	role: string,
	active: string,
	likes: Array<string>
};

export default new GraphQLObjectType({
	name: 'User',
	description: 'User data',
	fields: () => ({
		id: globalIdField('User'),
		_id: {
			type: GraphQLString,
			resolve: (user: UserType) => user._id,
		},
		name: {
			type: GraphQLString,
			resolve: (user: UserType) => user.name,
		},
		email: {
			type: GraphQLString,
			resolve: (user: UserType) => user.email,
		},
		likes: {
			type: GraphQLList(GraphQLString),
			resolve: (user: UserType) => user.likes,
		},
		active: {
			type: GraphQLBoolean,
			resolve: (user: UserType) => user.active,
		},
	}),
	interfaces: () => [ NodeInterface ],
});

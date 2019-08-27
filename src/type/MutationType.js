// @flow

import { GraphQLObjectType } from 'graphql';

import LoginEmail from '../mutation/LoginEmailMutation';
import RegisterEmail from '../mutation/RegisterEmailMutation';
import BookAdd from '../mutation/Books/BookAddMutation';
import BookEdit from '../mutation/Books/BookEditMutation';
import UserLikeBook from '../mutation/Books/UserLikeBookMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // auth
    LoginEmail,
    RegisterEmail,

    //books
    BookAdd,
    UserLikeBook,
    BookEdit,
  }),
});

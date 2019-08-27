import { graphql } from 'graphql';
import { schema } from '../../schema';
import { User, Book } from '../../model';
import { getContext, setupTest } from '../../../test/helper';
import { USER_NOT_VALID } from '../../utils/errorMessages';

describe('Book Add Mutation', () => {
  beforeEach(() => setupTest());
  it('should not add book if not authorized user', async () => {
    const book = new Book({
      title: 'Harry Potter',
      description: 'A little book of this magic',
      author: 'J. K. Rowling',
      price: 19.99,
      stars: 4,
      pages: '200',
      image: 'image.png',
      purchaseUrl: 'http://amazon.com',
    });
    await book.save();
    // language=GraphQL
    const query = `
      mutation M { 
        BookAdd(input: { 
          title: "Harry Potter",
          description: "A little book of this magic",
          author: "J. K. Rowling",
          price: 19,
          stars: 4,
          pages: "200",
          image: "image.png",
          purchaseUrl: "http://amazon.com",
        }) {
          clientMutationId
          error {
            message
          }
        }
      }
    `;

    const rootValue = {};
    const context = getContext();

    const result = await graphql(schema, query, rootValue, context);
    const { BookAdd } = result.data;

    expect(BookAdd.error.length).toBe(1);
    expect(BookAdd.error[0].message).toBe(USER_NOT_VALID);
  });

  it('should create an book by BookAdd mutation', async () => {
    const user = new User({
      name: 'user',
      email: 'awesome@example.com',
      password: 'awesome',
    });
    await user.save();

    const book = new Book({
      title: 'Harry Potter',
      description: 'A little book of this magic',
      author: 'J. K. Rowling',
      price: 19,
      stars: 4,
      pages: '200',
      image: 'image.png',
      purchaseUrl: 'http://amazon.com',
    });
    await book.save();

    // language=GraphQL
    const query = `
      mutation M {
        BookAdd(input: { 
          title: "Harry Potter",
          description: "A little book of this magic",
          author: "J. K. Rowling",
          price: 19,
          stars: 4,
          pages: "200",
          image: "image.png",
          purchaseUrl: "http://amazon.com"
        }) {
          book {
            title
            description
            author
            price
            stars
            pages
            image
            purchaseUrl
          }
        }
      }
    `;

    const rootValue = {};
    const context = getContext({ user });

    const result = await graphql(schema, query, rootValue, context);

    const { BookAdd } = result.data;

    expect(BookAdd.book.title).toBe('Harry Potter');
    expect(BookAdd.book.description).toBe('A little book of this magic');
    expect(BookAdd.book.author).toBe('J. K. Rowling');
    expect(BookAdd.book.price).toBe(19);
    expect(BookAdd.book.stars).toBe(4);
    expect(BookAdd.book.pages).toBe('200');
    expect(BookAdd.book.image).toBe('image.png');
    expect(BookAdd.book.purchaseUrl).toBe('http://amazon.com');
  });
});

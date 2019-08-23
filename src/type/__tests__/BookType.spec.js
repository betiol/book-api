import { graphql } from 'graphql';
import { schema } from '../../schema';
import { Book, User } from '../../model';
import { getContext, setupTest } from '../../../test/helper';

beforeEach(() => setupTest());

it('should the length of edges if has response', async () => {
	const user = new User({
		name: 'user',
		email: 'user@example.com',
		password: '123'
	});
	await user.save();

	const book = new Book({
		title: 'Harry Potter',
		description: 'A little book of this magic',
		author: 'J. K. Rowling',
		price: 1999,
		stars: 4,
		pages: '200',
		image: 'image.png',
		purchaseUrl: 'http://amazon.com'
	});

	book.save();

	// language=GraphQL
	const query = `
    query Q {
      books {
        edges {
          node {
            _id
            title
            description
            author
            price
            stars
            image
            pages
            purchaseUrl
          }
        }
      }
    }
  `;

	const rootValue = {};
	const context = getContext({ user });

	const result = await graphql(schema, query, rootValue, context);
	const { edges } = result.data.books;

	expect(edges.length).toBe(1);
});

it('should return a list of books', async () => {
	const user = new User({
		name: 'user',
		email: 'user@example.com',
		password: '123'
	});
	await user.save();

	const book = new Book({
		title: 'Harry Potter',
		description: 'A little book of this magic',
		author: 'J. K. Rowling',
		price: 1999,
		stars: 4,
		pages: '200',
		image: 'image.png',
		purchaseUrl: 'http://amazon.com'
	});

	book.save();

	// language=GraphQL
	const query = `
    query Q {
      books {
        edges {
          node {
            _id
            title
            description
            author
            price
            pages
            stars
            image
            purchaseUrl
          }
        }
      }
    }
  `;

	const rootValue = {};
	const context = getContext({ user });

	const result = await graphql(schema, query, rootValue, context);
	const { edges } = result.data.books;

	expect(edges[0].node.title).toBe(book.title);
	expect(edges[0].node.description).toBe(book.description);
	expect(edges[0].node.author).toBe(book.author);
	expect(edges[0].node.price).toBe(book.price);
	expect(edges[0].node.stars).toBe(book.stars);
	expect(edges[0].node.image).toBe(book.image);
	expect(edges[0].node.purchaseUrl).toBe(book.purchaseUrl);
});

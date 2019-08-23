import { setupTest } from '../../test/helper';
import { Book } from '../model';

describe('Books Tests', () => {
	beforeEach(() => setupTest());

	it('should create book without errors', async () => {
		const book = new Book({
			title: 'Harry Potter',
			description: 'A little book of this magic',
			author: 'J. K. Rowling',
			price: 19.99,
			stars: 4,
			image: 'image.png',
			purchaseUrl: 'http://amazon.com',
			pages: '200'
		});
		await book.save();

		expect(book.title).toBe('Harry Potter');
		expect(book.description).toBe('A little book of this magic');
		expect(book.author).toBe('J. K. Rowling');
		expect(book.price).toBe(book.price);
		expect(book.stars).toBe(4);
		expect(book.image).toBe('image.png');
		expect(book.pages).toBe('200');
		expect(book.purchaseUrl).toBe('http://amazon.com');
	});
});

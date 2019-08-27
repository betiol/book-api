import mongoose from 'mongoose';
import { User, Book } from '../model';
import { setupTest } from '../../test/helper';

import { getUser, generateToken } from '../auth';

const { ObjectId } = mongoose.Types;

beforeEach(() => setupTest());

describe('getUser', () => {
  it('should return an user null when token is null', async () => {
    const token = null;
    const { user } = await getUser(token);

    expect(user).toBe(null);
  });

  it('should return null when token is invalid', async () => {
    const token = 'invalid token';
    const { user } = await getUser(token);

    expect(user).toBe(null);
  });

  it('should return null when token do not represent a valid user', async () => {
    const token = generateToken({ _id: new ObjectId() });
    const { user } = await getUser(token);

    expect(user).toBe(null);
  });

  it('should return user from a valid token', async () => {
    const me = new User({
      name: 'user',
      email: 'user@example.com',
      password: '123',
    });
    await me.save();

    const token = generateToken(me);
    const { user } = await getUser(token);

    expect(user.name).toBe(me.name);
    expect(user.email).toBe(me.email);
  });

  it('should add books at likes array', async () => {
    const book = new Book({
      title: 'Harry Potter',
      description: 'A little book of this magic',
      author: 'J. K. Rowling',
      price: 19.99,
      stars: 4,
      image: 'image.png',
      purchaseUrl: 'http://amazon.com',
      pages: '200',
    });
    await book.save();

    const likes = [];

    likes.push(book.id.toString());

    const me = new User({
      name: 'user',
      email: 'user@example.com',
      password: '123',
      likes,
    });
    await me.save();

    expect(Array.isArray(me.likes)).toBe(true);
    expect(me.likes[0].toString()).toBe(book.id);
  });
});

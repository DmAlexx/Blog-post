const Post = require('../models/post');
const dateFormat = require('dateformat');
const moment = require('moment');

describe('Post Model', () => {
  it('should require a title', async () => {
    const post = new Post({
      description: 'Test description',
      body: 'Test body',
      author: 'Test author',
    });

    let error;
    try {
      await post.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.title.message).toBe('Path `title` is required.');
  });

  it('should format publishedAt date correctly', () => {
    const post = new Post({
      title: 'Test title',
      description: 'Test description',
      body: 'Test body',
      author: 'Test author',
      createdAt: new Date(),
    });

    const formattedDate = dateFormat(post.publishedAt, "ddd, mmm dS, yyyy");

    expect(formattedDate).toMatch(/^[A-Z][a-z]{2}, [A-Z][a-z]{2} \d{1,2}(st|nd|rd|th), \d{4}$/);
  });

  it('should calculate publishedSince time correctly', () => {
    const post = new Post({
      title: 'Test title',
      description: 'Test description',
      body: 'Test body',
      author: 'Test author',
      createdAt: moment().subtract(2, 'days').toDate(),
    });

    const publishedSince = post.publishedSince;

    expect(publishedSince).toBe('2 days ago');
  });
});

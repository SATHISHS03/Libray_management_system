import { Router } from 'express';
import authenticateUser from '../middleware/authuser.js';
import { user, books } from '../db/db.js';

const router = Router();

router.post('/signup', async (req, res) => {
  try {
    await user.create({
      username: req.body.username,
      password: req.body.password
    });

    res.json({ msg: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'User creation failed' });
  }
});

router.post('/watchlist/:bookid', authenticateUser, async (req, res) => {
  try {
    const userId = req.headers.userid;
    const bookId = req.params.bookid;
    const existingBook = await books.findById(bookId);

    if (!existingBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (existingBook.Quantity <= 0) {
      return res.status(400).json({ error: 'Book out of stock' });
    }

    await books.findByIdAndUpdate(bookId, { $inc: { Quantity: -1 } });
    await user.findByIdAndUpdate(userId, { $addToSet: { watchlist: bookId } });
    res.json({ msg: 'Book added to watchlist successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/submitbook/:bookid', authenticateUser, async (req, res) => {
  try {
    const userId = req.headers.userid;
    const bookId = req.params.bookid;
    const existingBook = await books.findById(bookId);

    if (!existingBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await books.findByIdAndUpdate(bookId, { $inc: { Quantity: 1 } });
    await user.findByIdAndUpdate(userId, { $pull: { watchlist: bookId } });
    res.json({ msg: 'Book submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;

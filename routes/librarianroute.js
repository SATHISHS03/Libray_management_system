
import { Router } from 'express';
import authenticateLibrarian from '../middleware/authlibrarian.js'
import {    librarian,user,books} from '../db/db.js'

const router = Router();


const sendSuccessResponse = (res, message) => {
    res.json({ success: true, message });
  };
  
  const sendErrorResponse = (res, message) => {
    res.status(500).json({ success: false, error: message });
  };
  
  router.post('/signup', (req, res) => {
    librarian.create({
      username: req.body.username,
      password: req.body.password
    }, (err) => {
      if (err) {
        sendErrorResponse(res, 'Librarian creation failed');
      } else {
        sendSuccessResponse(res, 'Librarian created successfully');
      }
    });
  });
  
  router.post('/addbooks', authenticateLibrarian, async (req, res) => {
    try {
      await books.create({
        Book_name: req.body.Book_name,
        Published: req.body.published,
        Quantity: req.body.Quantity
      });
      sendSuccessResponse(res, 'Book added successfully');
    } catch (error) {
      sendErrorResponse(res, 'Book addition failed');
    }
  });
  
  router.get('/usersWithLibraryBooks', async (req, res) => {
    try {
      const usersWithLibraryBooks = await user.find({ watchlist: { $exists: true, $not: { $size: 0 } } });
      const usersInfo = usersWithLibraryBooks.map(user => ({
        userId: user._id,
        username: user.username,
        watchlist: user.watchlist,
      }));
      res.json({ success: true, users: usersInfo });
    } catch (error) {
      sendErrorResponse(res, 'Internal Server Error');
    }
  });
  
  export default router;
  
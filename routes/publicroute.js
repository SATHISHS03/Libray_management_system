// Importing necessary modules and models
import { Router } from 'express';
import {  books } from '../db/db.js';

// Creating an instance of the Express router
const router = Router();

// Defining a route to get all books
router.get('/viewbooks', async (req, res) => {
    try {
        // Fetching all books from the 'books' collection
        const allBooks = await books.find();

        // Sending the retrieved books as a JSON response
        res.json(allBooks);
    } catch (error) {
        // Handling errors and sending a 500 Internal Server Error response
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Exporting the router for use in other parts of the application
export default router;

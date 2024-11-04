const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.post('/', bookController.addBook); // Add a new book
router.get('/taken',bookController.getTakenBooks);
router.put('/:id/return', bookController.returnBook); // Mark a book as returned
router.get('/returned', bookController.getReturnedBooks); // View all returned books

module.exports = router;
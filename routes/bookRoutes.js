const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  patchBook,
  deleteBook,
} = require('../controllers/bookController');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.put('/:id', updateBook);
router.patch('/:id', patchBook);
router.delete('/:id', deleteBook);

module.exports = router;
const { Book } = require('../models');
const ApiError = require('../utils/ApiError');
const { validateCreate, validateUpdate } = require('../validators/bookValidator');

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    next(err);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      throw ApiError.notFound('Book not found');
    }
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const { error } = validateCreate(req.body);
    if (error) {
      throw ApiError.unprocessableEntity(error.details.map(d => d.message).join(', '));
    }
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      throw ApiError.notFound('Book not found');
    }
    const { error } = validateUpdate(req.body);
    if (error) {
      throw ApiError.unprocessableEntity(error.details.map(d => d.message).join(', '));
    }
    await book.update(req.body);
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.patchBook = async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      throw ApiError.notFound('Book not found');
    }
    const { error } = validateUpdate(req.body);
    if (error) {
      throw ApiError.unprocessableEntity(error.details.map(d => d.message).join(', '));
    }
    await book.update(req.body);
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      throw ApiError.notFound('Book not found');
    }
    await book.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
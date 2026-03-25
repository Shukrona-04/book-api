const Joi = require('joi');

const createBookSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  author: Joi.string().min(2).max(100).required(),
  genre: Joi.string().min(2).max(50).required(),
  year: Joi.number().integer().min(1450).max(new Date().getFullYear()).required(),
  available: Joi.boolean().required(),
});

const updateBookSchema = Joi.object({
  title: Joi.string().min(2).max(100),
  author: Joi.string().min(2).max(100),
  genre: Joi.string().min(2).max(50),
  year: Joi.number().integer().min(1450).max(new Date().getFullYear()),
  available: Joi.boolean(),
}).min(1);

module.exports = {
  validateCreate: (data) => createBookSchema.validate(data, { abortEarly: false }),
  validateUpdate: (data) => updateBookSchema.validate(data, { abortEarly: false }),
};
const sequelize = require('../config/db');
const BookModel = require('./Book');
const UserModel = require('./User');

const Book = BookModel(sequelize);
const User = UserModel(sequelize);

module.exports = {
  sequelize,
  Book,
  User,
};
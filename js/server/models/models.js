const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true},
  email: {type: DataTypes.STRING, unique: true, validate: {isEmail: true}},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.ENUM, defaultValue: 'USER', values: ['USER', 'ADMIN']},
}, {timestamps: true});

const Feedback = sequelize.define('feedback', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},
  content: {type: DataTypes.TEXT, allowNull: false},
  rating: {type: DataTypes.INTEGER, validate: {min: 0, max: 5}},
}, {timestamps: true});

User.hasMany(Feedback);
Feedback.belongsTo(User);

const Article = sequelize.define('article', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},
  description: {type: DataTypes.TEXT, allowNull: false},
  content: {type: DataTypes.TEXT, allowNull: false},
  img: {type: DataTypes.STRING, allowNull: false},
}, {timestamps: true});

const Movie = sequelize.define('movie', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},
  country: {type: DataTypes.STRING, allowNull: false},
  duration: {type: DataTypes.STRING, allowNull: false},
  poster: {type: DataTypes.STRING, allowNull: false},
  description: {type: DataTypes.TEXT, allowNull: false},
  rating: {type: DataTypes.FLOAT, allowNull: false},
  yearOfProduction: {type: DataTypes.STRING, allowNull: false},
}, {timestamps: true});


module.exports = {
  User,
  Feedback,
  Article,
  Movie,
};

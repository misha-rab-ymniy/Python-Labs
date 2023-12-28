const { Movie } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

class MovieController {
  async create(req, res, next) {
    try {
      let movieToCreate = req.body;
      const { img } = req.files;

      if (!img) return res.sendStatus(400);

      let fileName = uuid.v4() + '.png';
      await img.mv(path.resolve(__dirname, '..', 'static', fileName));

      movieToCreate.poster = fileName;
      const movie = await Movie.create(movieToCreate);
      return res.json(movie);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const { sortField, search, sortDirection } = req.query;
      const movies = await Movie.findAll({
        order: [[sortField ?? 'title', sortDirection ?? 'ASC']],
        ...(search ? { where: { title: { [Op.iLike]: `%${search}%` } } } : {}),
      });
      return res.json(movies);
    } catch (err) {
      next(err);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await Movie.findOne(
        {
          where: { id },
        },
      );
      return res.json(movie);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      let updateFields = req.body;

      const movie = await Movie.update(
        updateFields,
        {
          where: { id },
        },
      );
      return res.json(movie);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      await Movie.destroy(
        {
          where: { id },
        },
      );
      return res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new MovieController();

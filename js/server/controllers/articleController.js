const { Brand, Type, Device, DeviceInfo, Article } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');

class ArticleController {
  async create(req, res, next) {
    try {
      let { title, description, content } = req.body;
      const { img } = req.files;
      if (!img) return res.sendStatus(400);
      let fileName = uuid.v4() + '.png';
      await img.mv(path.resolve(__dirname, '..', 'static', fileName));

      const article = await Article.create({ title, description, content, img: fileName });
      return res.json(article);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const articles = await Article.findAll();
    return res.json(articles);
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const article = await Article.findOne(
        {
          where: { id },
        },
      );
      return res.json(article);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      let updateFields = req.body;

      const article = await Article.update(
        updateFields,
        {
          where: { id },
        },
      );
      return res.json(article);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const article = await Article.destroy(
        {
          where: { id },
        },
      );
      return res.json(article);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ArticleController();

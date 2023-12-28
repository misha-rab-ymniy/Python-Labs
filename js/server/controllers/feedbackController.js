const {Feedback, User} = require('../models/models');

class FeedbackController {
  async create(req, res) {
    const feedbackToCreate = req.body;
    feedbackToCreate.userId = req.user.id;

    const feedback = await Feedback.create(feedbackToCreate);

    return res.json(feedback);
  }

  async getAll(req, res) {
    const feedbacks = await Feedback.findAll({include: [User], order: [['createdAt', 'desc']]});
    return res.json(feedbacks);
  }
}

module.exports = new FeedbackController();

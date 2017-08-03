const Draft = require('../models').Draft;

module.exports = {
  create(req, res) {
    return Draft
      .create({
        name: req.body.name,
        format: req.body.format,
        userId: req.body.userId,
      })
      .then(draft => res.status(201).send(draft))
      .catch(error => res.status(400).send(error));
  },
  get(req, res) {
    return Draft
      .findOne({
        where: {
          userId: req.params.userId,
          id: req.params.draftId,
        }
      })
      .then(draft => res.status(200).send(draft))
      .catch(error => res.status(400).send(error));
  },
  getAll(req, res) {
    return Draft
      .findAll({
        where: {
          userId: req.params.userId,
        }
      })
      .then(draft => res.status(200).send(draft))
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return Draft
      .destroy({
        where: {
          userId: req.params.userId,
          id: req.params.draftId,
        }
      })
      .then(() => {
        return Draft.findAll({
          where: {
            userId: req.params.userId,
          }
        });
      })
      .then(drafts => res.status(200).send(drafts))
      .catch(error => res.status(400).send(error));
  },
}
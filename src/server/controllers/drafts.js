const Draft = require('../models').Draft;

module.exports = {
  create(req, res) {
    return Draft
      .create({
        name: req.body.name,
        format: req.body.format,
        state: req.body.state,
        cards: req.body.cards,
        packs: req.body.packs,
        userId: req.body.userId,
      })
      .then(draft => res.status(200).send(draft))
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
  updateCards(req, res) {
    return Draft
      .findOne({
        where: {
          userId: req.params.userId,
          id: req.params.draftId,
        }
      })
      .then(draft => {
        if (!draft) {
          return res.status(404).send({ message: 'Draft Not Found' });
        }
        draft.cards.push(req.body.card)
        return draft
          .update({ cards: draft.cards })
          .then(() => res.status(200).send(draft))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  updateState(req, res) {
    return Draft
      .findOne({
        where: {
          userId: req.params.userId,
          id: req.params.draftId,
        }
      })
      .then(draft => {
        if (!draft) {
          return res.status(404).send({ message: 'Draft Not Found' });
        }
        return draft
          .update({ state: req.body.state })
          .then(() => res.status(200).send(draft))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  subtractAmount(req, res) {
    return Draft
      .findOne({
        where: {
          userId: req.params.userId,
          id: req.params.draftId,
        }
      })
      .then(draft => {
        if (!draft) {
          return res.status(404).send({ message: 'Draft Not Found' });
        }
        draft.packs.map((data) => {
          if (data.type === req.body.expansion) {
            data.amount = data.amount - 1;
          }
        });
        return draft
          .update({ packs: draft.packs })
          .then(() => res.status(200).send(draft))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  addAmount(req, res) {
    return Draft
      .findOne({
        where: {
          userId: req.params.userId,
          id: req.params.draftId,
        }
      })
      .then(draft => {
        if (!draft) {
          return res.status(404).send({ message: 'Draft Not Found' });
        }
        draft.packs.map((data) => {
          if (data.type === req.body.expansion) {
            data.amount = data.amount + 1;
          }
        });
        return draft
          .update({ packs: draft.packs })
          .then(() => res.status(200).send(draft))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
}
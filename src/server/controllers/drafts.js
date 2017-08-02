const Draft = require('../models').Draft;

module.exports = {
  create(req, res) {
    return Draft
      .create({
        name: req.body.name,
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
  }

  // get(req, res) {
  //   return User
  //     .findOne({
  //       where: {
  //         username: req.body.username,
  //         password: req.body.password,
  //       }
  //     })
  //     .then(user => {
  //       if (user) {
  //         res.status(200).send(user);
  //       } else {
  //         res.status(200).send({ error: 'User does not exist or Password is wrong.' });
  //       }
  //     })
  //     .catch(error => {
  //       res.status(400).send(error)
  //     });
  // },
  // getAll(req, res) {
  //   return User
  //     .all()
  //     .then(user => res.status(200).send(user))
  //     .catch(error => res.status(400).send(error));
  // },
}
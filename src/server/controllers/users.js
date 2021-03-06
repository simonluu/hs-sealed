const User = require('../models').User;
const Draft = require('../models').Draft;

module.exports = {
  create(req, res) {
    return User
      .findOne({
        where: {
          username: req.body.username,
        }
      })
      .then(user => {
        if (!user){
          return User.create({
            username: req.body.username,
            password: req.body.password,
          });
        } else {
          res.status(200).send({ error: 'Username already exists.' });
        }
      })
      .then((user) => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
  },
  get(req, res) {
    return User
      .findOne({
        where: {
          username: req.body.username,
          password: req.body.password,
        }
      })
      .then(user => {
        if (user) {
          res.status(200).send(user);
        } else {
          res.status(200).send({ error: 'User does not exist or Password is wrong.' });
        }
      })
      .catch(error => {
        res.status(400).send(error)
      });
  },
  getAll(req, res) {
    return User
      .findAll({
        include: [{
          model: Draft,
          as: 'drafts'
        }],
      })
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
  },
}